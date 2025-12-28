import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Tabs, Tab, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
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

  const getResumePath = (filename) => {
    // Use the public URL to ensure correct path in both dev and production
    return `${process.env.PUBLIC_URL}/resumes/${filename}`;
  };

  const getPreviewPath = (previewPath) => {
    // Handle preview images with fallback
    try {
      return require(`../public${previewPath}`);
    } catch (e) {
      // Fallback to a placeholder if the image doesn't exist
      return `${process.env.PUBLIC_URL}/images/placeholder-resume.jpg`;
    }
  };

  const resumes = {
    dataScientist: {
      title: 'Data Scientist',
      file: 'data_scientist_resume.pdf',
      preview: getPreviewPath('/images/resumes/data_scientist_preview.jpg'),
      description: 'Expertise in machine learning, deep learning, and statistical modeling. Proficient in Python, TensorFlow, and data visualization.'
    },
    dataEngineer: {
      title: 'Data Engineer',
      file: 'data_engineer_resume.pdf',
      preview: getPreviewPath('/images/resumes/data_engineer_preview.jpg'),
      description: 'Specialized in building scalable data pipelines, ETL processes, and data infrastructure using tools like Spark, Airflow, and cloud platforms.'
    },
    dataAnalyst: {
      title: 'Data Analyst',
      file: 'data_analyst_role.pdf',
      preview: getPreviewPath('/images/resumes/data_analyst_preview.jpg'),
      description: 'Skilled in data visualization, business intelligence, and data-driven decision making. Proficient in SQL, Tableau, and statistical analysis.'
    }
  };

  // Function to render PDF page
  const renderPdf = async (pdfDoc, pageNum) => {
    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render PDF page
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  };

  // Load PDF when active tab changes
  useEffect(() => {
    let currentPdf = null;
    let isMounted = true;

    const loadPdf = async () => {
      if (!resumes[activeTab]) return;
      
      setIsLoading(true);
      try {
        const loadingTask = pdfjsLib.getDocument(resumes[activeTab].file);
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
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
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
    <section id="resumes" className="py-5 bg-light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="section-title">My Resumes</h2>
          <p className="text-muted">Select a profile to view and download the corresponding resume</p>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4 justify-content-center"
              variant="pills"
            >
              {Object.entries(resumes).map(([key, resume]) => (
                <Tab
                  key={key}
                  eventKey={key}
                  title={
                    <div className="d-flex align-items-center">
                      <FaFilePdf className="me-2" />
                      {resume.title}
                    </div>
                  }
                />
              ))}
            </Tabs>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="resume-preview-container bg-white p-4 rounded-4 shadow-sm"
            >
              <div className="d-flex flex-column flex-md-row">
                <div className="resume-preview me-md-4 mb-4 mb-md-0">
                  <img
                    src={resumes[activeTab].preview}
                    alt={`${resumes[activeTab].title} Resume Preview`}
                    className="img-fluid rounded-3 shadow-sm"
                    style={{ border: '1px solid #eee' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x400/1a1a1a/D4BC9E?text=Resume+Preview';
                    }}
                  />
                </div>
                <div className="resume-details flex-grow-1">
              </div>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
    
    {/* PDF Viewer Modal */}
    <div 
      id="resumeModal" 
      ref={modalRef}
      style={{
        display: 'none',
        position: 'fixed',
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 500 }}>
            {resumes[activeTab]?.title || 'Resume'}
          </div>
          <div>
            <button 
              onClick={toggleFullscreen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                marginRight: '8px',
                color: '#6c757d',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              <FaExpand />
            </button>
            <button 
              onClick={() => {
                document.getElementById('resumeModal').style.display = 'none';
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                color: '#6c757d',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        
        {/* PDF Canvas Container */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#525659',
          position: 'relative'
        }}>
          {isLoading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%'
            }}>
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <canvas ref={canvasRef} />
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={goToPrevPage}
              disabled={currentPage <= 1 || isLoading}
              style={{
                padding: '4px 8px',
                border: '1px solid #dee2e6',
                background: '#fff',
                borderRadius: '4px',
                cursor: currentPage > 1 && !isLoading ? 'pointer' : 'not-allowed',
                opacity: currentPage > 1 && !isLoading ? 1 : 0.6
              }}
            >
              <FaChevronLeft />
            </button>
            <span>
              Page <span style={{ fontWeight: 500 }}>{currentPage}</span> of <span style={{ fontWeight: 500 }}>{pageCount}</span>
            </span>
            <button 
              onClick={goToNextPage}
              disabled={currentPage >= pageCount || isLoading}
              style={{
                padding: '4px 8px',
                border: '1px solid #dee2e6',
                background: '#fff',
                borderRadius: '4px',
                cursor: currentPage < pageCount && !isLoading ? 'pointer' : 'not-allowed',
                opacity: currentPage < pageCount && !isLoading ? 1 : 0.6
              }}
            >
              <FaChevronRight />
            </button>
          </div>
          
          <a
            href={getResumePath(resumes[activeTab]?.file)}
            download={resumes[activeTab]?.file}
            className="btn btn-sm btn-primary"
            type="application/pdf"
            style={{
              textDecoration: 'none',
              color: 'white',
              marginRight: '10px'
            }}
          >
            <FaDownload className="me-1" /> Download PDF
          </a>
        </div>
      </div>
    </div>
  </section>
);
};

export default Resumes;
