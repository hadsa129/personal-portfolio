import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Tabs, Tab, Spinner, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

// Set worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Resumes = () => {
  const [activeTab, setActiveTab] = useState('dataScientist');
  const [pdfDocument, setPdfDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);
  const modalRef = useRef(null);

  const getResumePath = useCallback((filename) => {
    // Use the correct path for GitHub Pages
    return `${process.env.PUBLIC_URL}/resumes/${filename}`;
  }, []);

  const getPreviewPath = useCallback((previewPath) => {
    // Use direct path for production
    return `${process.env.PUBLIC_URL}${previewPath}`;
  }, []);

  const resumes = React.useMemo(() => ({
    dataScientist: {
      id: 'dataScientist',
      title: 'Data Scientist',
      file: 'data_scientist_resume.pdf',
      preview: '/images/resumes/data_scientist_preview.png',
      description: 'Expertise in machine learning, deep learning, and statistical modeling. Proficient in Python, TensorFlow, and data visualization.'
    },
    dataEngineer: {
      id: 'dataEngineer',
      title: 'Data Engineer',
      file: 'data_engineer_resume.pdf',
      preview: '/images/resumes/data_engineer_preview.png',
      description: 'Specialized in building scalable data pipelines, ETL processes, and data infrastructure using tools like Spark, Airflow, and cloud platforms.'
    },
    dataAnalyst: {
      id: 'dataAnalyst',
      title: 'Data Analyst',
      file: 'data_analyst_role.pdf',
      preview: '/images/resumes/data_analyst_preview.png',
      description: 'Skilled in data visualization, business intelligence, and data-driven decision making. Proficient in SQL, Tableau, and statistical analysis.'
    }
  }), []);

  // Function to render PDF page
  const renderPdf = useCallback(async (pdfDoc, pageNum) => {
    if (!pdfDoc || !canvasRef.current) return;
    
    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Clear previous content
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Render PDF page
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (error) {
      console.error('Error rendering PDF:', error);
      // Show error state to user
    }
  }, []);

  // Load PDF when active tab changes
  useEffect(() => {
    let currentPdf = null;
    let isMounted = true;

    const loadPdf = async () => {
      if (!resumes[activeTab]) return;
      
      setIsLoading(true);
      try {
        const resume = resumes[activeTab];
        const resumeUrl = getResumePath(resume.file);
        
        // Show preview image while loading
        setPdfDocument(null);
        
        const loadingTask = pdfjsLib.getDocument({
          url: resumeUrl,
          cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        });
        
        const pdf = await loadingTask.promise;
        
        if (!isMounted) {
          pdf.destroy();
          return;
        }
        
        setPdfDocument(pdf);
        currentPdf = pdf;
        setPageCount(pdf.numPages);
        setCurrentPage(1);
        
        if (canvasRef.current) {
          await renderPdf(pdf, 1);
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadPdf();
    
    return () => {
      isMounted = false;
      if (currentPdf) {
        currentPdf.destroy();
      }
    };
  }, [activeTab, resumes]);

  // Handle download
  const handleDownload = useCallback(() => {
    const resume = resumes[activeTab];
    if (!resume) return;
    
    try {
      const link = document.createElement('a');
      link.href = getResumePath(resume.file);
      link.download = resume.file;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  }, [activeTab, resumes, getResumePath]);

  // Handle preview click
  const handlePreviewClick = useCallback(() => {
    const resume = resumes[activeTab];
    if (!resume) return;
    
    try {
      // Open PDF in a new tab
      window.open(getResumePath(resume.file), '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening resume preview:', error);
    }
  }, [activeTab, resumes, getResumePath]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (pdfDocument) {
        try {
          pdfDocument.destroy();
        } catch (error) {
          console.error('Error cleaning up PDF document:', error);
        }
      }
    };
  }, [pdfDocument]);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    // Reset to first page when changing tabs
    setCurrentPage(1);
  }, []);

  // Handle page navigation
  const goToPrevPage = async () => {
    if (currentPage <= 1 || !pdfDocument) return;
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    await renderPdf(pdfDocument, newPage);
  };
  
  const goToNextPage = async () => {
    if (currentPage >= pageCount || !pdfDocument) return;
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    await renderPdf(pdfDocument, newPage);
  };
  
  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  // Handle page navigation
  const goToPage = useCallback((page) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  }, [pageCount]);
  
  // Update PDF view when page changes
  useEffect(() => {
    if (pdfDocument && currentPage >= 1 && currentPage <= pageCount) {
      renderPdf(pdfDocument, currentPage);
    }
  }, [currentPage, pdfDocument, renderPdf]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section id="resumes" className="py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="section-title display-5 fw-bold mb-3">My Resumes</h2>
          <p className="text-muted lead">View or download my professional resumes</p>
        </motion.div>

        <Tabs
          activeKey={activeTab}
          onSelect={handleTabChange}
          className="mb-4 justify-content-center"
          variant="pills"
        >
          {Object.values(resumes).map((resume) => (
            <Tab
              key={resume.id}
              eventKey={resume.id}
              title={resume.title}
              className="nav-link"
            />
          ))}
        </Tabs>

        <Row className="justify-content-center">
          <Col lg={10}>
            <motion.div 
              className="resume-preview-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
                  <Spinner animation="border" variant="primary" />
                  <span className="ms-2">Loading resume...</span>
                </div>
              ) : (
                <div className="position-relative">
                  {resumes[activeTab]?.preview ? (
                    <img
                      src={getPreviewPath(resumes[activeTab].preview)}
                      alt={`${resumes[activeTab]?.title} Preview`}
                      className="img-fluid w-100"
                      style={{ 
                        cursor: 'pointer',
                        maxHeight: '500px',
                        objectFit: 'contain',
                        backgroundColor: '#f8f9fa',
                        padding: '1rem'
                      }}
                      onClick={handlePreviewClick}
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '500px', backgroundColor: '#f8f9fa' }}>
                      <div className="text-center">
                        <FaFilePdf size={48} className="text-muted mb-3" />
                        <p className="mb-0">No preview available</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="position-absolute top-0 end-0 p-3 d-flex" style={{ opacity: 1, transition: 'opacity 0.3s ease' }}>
                    <Button
                      variant="primary"
                      onClick={handlePreviewClick}
                      className="me-2"
                      size="sm"
                      title="View Fullscreen"
                    >
                      <FaExpand className="me-1" /> View
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleDownload}
                      size="sm"
                      title="Download PDF"
                      className="download-btn"
                      style={{
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}
                    >
                      <FaDownload className="me-1" /> Télécharger
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 p-3">
                <h4 className="mb-3">{resumes[activeTab]?.title}</h4>
                <p className="mb-0">{resumes[activeTab]?.description}</p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

          
     
    </section>
  );
};

export default Resumes;
