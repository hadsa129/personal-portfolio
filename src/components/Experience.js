// src/components/Experience.js
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import "animate.css";

const experiences = [
  {
    id: 1,
    role: "Data Engineer",
    company: "Orange Tunisia",
    period: "Jan 2024 - Present",
    location: "Tunis, Tunisia",
    mentor: "Mentor: [Mentor Name]",
    logo: "/images/orange-logo.png",
    description: "Developing and maintaining data pipelines and analytics solutions.",
    projects: [
      "Built ETL pipelines processing 10M+ daily records using Databricks and Spark",
      "Implemented real-time data processing with Apache Kafka and Spark Streaming",
      "Designed and optimized Delta Lake architecture for efficient data storage",
      "Created automated data quality checks reducing errors by 40%"
    ],
    tags: ["Databricks", "Spark", "Python", "SQL", "Airflow", "Kafka", "Delta Lake"]
  },
  {
    id: 2,
    role: "Data Scientist Intern",
    company: "ATB Bank",
    period: "Jun 2023 - Dec 2023",
    location: "Tunis, Tunisia",
    mentor: "Mentor: [Mentor Name]",
    logo: "/images/atb-logo.png",
    description: "Developed machine learning models for financial data analysis.",
    projects: [
      "Built an OCR system for cheque processing with 92% accuracy",
      "Implemented NLP models for document classification",
      "Created interactive dashboards for data visualization",
      "Automated data cleaning processes saving 15 hours/week"
    ],
    tags: ["Python", "OpenCV", "Tesseract", "NLP", "Django", "Power BI"]
  },
  {
    id: 3,
    role: "Machine Learning Intern",
    company: "Vermeg",
    period: "Feb 2023 - May 2023",
    location: "Tunis, Tunisia",
    mentor: "Mentor: [Mentor Name]",
    logo: "/images/vermeg-logo.png",
    description: "Worked on AI/ML solutions for financial services.",
    projects: [
      "Developed a document processing pipeline using computer vision",
      "Implemented text extraction and classification models",
      "Created a search engine for financial documents",
      "Improved data processing speed by 30%"
    ],
    tags: ["Python", "TensorFlow", "OpenCV", "NLP", "Docker"]
  }
];

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      className="experience-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="experience-timeline">
        <div className="timeline-dot"></div>
        {index !== experiences.length - 1 && <div className="timeline-line"></div>}
      </div>
      <div className="experience-content">
        <div className="experience-header">
          <div className="company-logo">
            <img 
              src={experience.logo} 
              alt={experience.company}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/60x60/0A0A0A/B5B88F?text=" + 
                  experience.company.charAt(0).toUpperCase();
              }}
            />
          </div>
          <div className="experience-title">
            <h3>{experience.role}</h3>
            <h4>{experience.company}</h4>
          </div>
          <div className="experience-period">{experience.period}</div>
        </div>
        
        <div className="experience-meta">
          <div className="meta-item">
            <FaMapMarkerAlt className="meta-icon" />
            <span>{experience.location}</span>
          </div>
          <div className="meta-item">
            <FaUserTie className="meta-icon" />
            <span>{experience.mentor}</span>
          </div>
        </div>

        <p className="experience-description">{experience.description}</p>
        
        <div className="experience-projects">
          <h5>Key Projects & Achievements:</h5>
          <ul>
            {experience.projects.map((project, i) => (
              <li key={i}>{project}</li>
            ))}
          </ul>
        </div>

        <div className="experience-tags">
          {experience.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            My professional journey and the companies I've worked with
          </p>
        </motion.div>

        <div className="experience-timeline-container">
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={exp.id} 
              experience={exp} 
              index={index} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;