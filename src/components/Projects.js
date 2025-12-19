// src/components/Projects.js
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaExternalLinkAlt, FaServer } from "react-icons/fa";
import { motion } from "framer-motion";
import "animate.css";

const projects = [
  {
    title: "Client Data ETL Pipeline – Orange Tunisia",
    description: "Automated Lambda ETL pipelines on Databricks using Medallion architecture (Bronze/Silver/Gold). Processed high-volume telecom data and integrated into Snowflake for analytics, customer segmentation, and predictive modeling.",
    tools: ["Databricks", "Spark", "Delta Lake", "Snowflake", "Airflow", "Python", "ETL/ELT"],
    image: "/images/etl-pipeline.jpg",
    github: "#"
  },
  {
    title: "RAG Chatbot – Orange Tunisia",
    description: "Intelligent chatbot using RAG architecture with Qwen 2.5 LLM and ChromaDB for semantic retrieval from CSV data. Deployed via secure Django API with Docker.",
    tools: ["Qwen 2.5", "ChromaDB", "LangChain", "Django", "Docker", "FastAPI", "RAG"],
    image: "/images/rag-chatbot.jpg",
    github: "#"
  },
  {
    title: "OCR Cheque Autocorrection System – ATB",
    description: "NLP + KNN system to detect and correct mismatches between numeric and written amounts on bank cheques, achieving 92% accuracy. Integrated with a Django web application and Power BI dashboards.",
    tools: ["OpenCV", "Tesseract", "KNN", "Django", "Power BI", "NLP"],
    image: "/images/cheque-ocr.jpg",
    github: "#"
  },
  {
    title: "Social Media Mental Health Analyzer",
    description: "Containerized ETL pipeline ingesting Facebook and Twitter data into MongoDB. Performed NLP analysis for depression detection using zero-shot classification and sentiment models.",
    tools: ["Airflow", "MongoDB", "Hugging Face", "Transformers", "Docker", "NLP"],
    image: "/images/mental-health.jpg",
    github: "#"
  },
  {
    title: "Automated Attendance Tracking System",
    description: "CNN-based face detection and recognition system for automated attendance, achieving 88% real-time accuracy through image preprocessing and model optimization.",
    tools: ["TensorFlow", "OpenCV", "CNN", "Python", "Computer Vision"],
    image: "/images/attendance-system.jpg",
    github: "#"
  },
  {
    title: "Credit Card Fraud Detection",
    description: "Built and optimized an end-to-end ML pipeline for fraud detection, performing data preprocessing, feature engineering, and model evaluation to reach 87% accuracy.",
    tools: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
    image: "/images/fraud-detection.jpg",
    github: "#"
  },
  {
    title: "London Bike Sharing Analysis",
    description: "Cleaned and analyzed Kaggle bike share dataset, creating interactive Tableau dashboards showing ridership trends by weather, hour, and season.",
    tools: ["Tableau", "Pandas", "Data Visualization", "EDA"],
    image: "/images/bike-sharing.jpg",
    github: "#"
  },
  {
    title: "Laptops Product Sales Analysis",
    description: "Implemented ETL processes to clean and structure sales data in SQL Server. Created Power BI dashboards with KPIs, charts, and slicers to track revenue, profit, and sales trends.",
    tools: ["Power BI", "SQL Server", "ETL", "Data Visualization"],
    image: "/images/sales-analysis.jpg",
    github: "#"
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <Col lg={6} className="mb-5" key={index}>
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      >
        <div className="project-image">
          <img 
            src={project.image} 
            alt={project.title} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x400/0A0A0A/B5B88F?text=" + encodeURIComponent(project.title);
            }}
          />
          <div className="project-overlay">
            <div className="project-links">
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" title="View on GitHub">
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {project.demo && project.demo !== "#" ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" title="View Live Demo">
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              ) : (
                <span className="project-link disabled" title="Demo not available">
                  <FaServer />
                  <span>Demo on Request</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="project-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tools.map((tool, i) => (
              <span key={i} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Col>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Here are some of my projects that demonstrate my expertise in data engineering, machine learning, and data analysis.
          </p>
        </motion.div>

        <Row className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={index} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;