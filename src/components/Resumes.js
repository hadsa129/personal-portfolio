import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

const Resumes = () => {
  const [activeTab, setActiveTab] = useState('dataScientist');

  const resumes = {
    dataScientist: {
      title: 'Data Scientist',
      file: '/resumes/data_scientist_resume.pdf',
      preview: '/images/resumes/data_scientist_preview.jpg',
      description: 'Expertise in machine learning, deep learning, and statistical modeling. Proficient in Python, TensorFlow, and data visualization.'
    },
    dataEngineer: {
      title: 'Data Engineer',
      file: '/resumes/data_engineer_resume.pdf',
      preview: '/images/resumes/data_engineer_preview.jpg',
      description: 'Specialized in building scalable data pipelines, ETL processes, and data infrastructure using tools like Spark, Airflow, and cloud platforms.'
    },
    dataAnalyst: {
      title: 'Data Analyst',
      file: '/resumes/data_analyst_role.pdf',
      preview: '/images/resumes/data_analyst_preview.jpg',
      description: 'Skilled in data visualization, business intelligence, and data-driven decision making. Proficient in SQL, Tableau, and statistical analysis.'
    }
  };

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
                  <h3 className="mb-3">{resumes[activeTab].title} Resume</h3>
                  <p className="text-muted mb-4">{resumes[activeTab].description}</p>
                  <div className="d-flex flex-wrap gap-3">
                    <a
                      href={resumes[activeTab].file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      download
                    >
                      <FaDownload className="me-2" />
                      Download PDF
                    </a>
                    <a
                      href={resumes[activeTab].file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary"
                    >
                      <FaFilePdf className="me-2" />
                      Open in New Tab
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resumes;
