// src/components/Resume.js
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import "animate.css";

const resumes = [
  {
    id: 1,
    title: "Data Engineer",
    file: "/resumes/Data_Engineer_Resume.pdf",
    image: "/images/resume-de.jpg",
    description: "Focused on data pipeline development, ETL processes, and big data technologies."
  },
  {
    id: 2,
    title: "Data Scientist",
    file: "/resumes/Data_Scientist_Resume.pdf",
    image: "/images/resume-ds.jpg",
    description: "Specializing in machine learning, statistical analysis, and predictive modeling."
  },
  {
    id: 3,
    title: "Data Analyst",
    file: "/resumes/Data_Analyst_Resume.pdf",
    image: "/images/resume-da.jpg",
    description: "Expert in data visualization, business intelligence, and data-driven decision making."
  }
];

const ResumeCard = ({ resume }) => {
  return (
    <Col lg={4} md={6} className="mb-4">
      <motion.div
        className="resume-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="resume-image">
          <img 
            src={resume.image} 
            alt={resume.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x560/0A0A0A/B5B88F?text=" + 
                resume.title.split(' ').map(w => w[0]).join('').toUpperCase();
            }}
          />
          <div className="resume-overlay">
            <a 
              href={resume.file} 
              className="download-btn"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload /> Download PDF
            </a>
          </div>
        </div>
        <div className="resume-content">
          <h3>{resume.title}</h3>
          <p>{resume.description}</p>
          <div className="resume-actions">
            <a 
              href={resume.file} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-preview"
            >
              <FaFilePdf /> Preview
            </a>
            <a 
              href={resume.file} 
              download
              className="btn-download"
            >
              <FaDownload /> Download
            </a>
          </div>
        </div>
      </motion.div>
    </Col>
  );
};

const Resume = () => {
  return (
    <section id="resume" className="resume-section">
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">My Resumes</h2>
          <p className="section-subtitle">
            Download my professional resumes tailored for different roles
          </p>
        </motion.div>

        <Row className="resume-grid">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Resume;