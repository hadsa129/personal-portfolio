// src/components/Experience.js
import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaChevronRight, FaChartLine } from "react-icons/fa";
import { SiPython, SiDjango, SiDocker, SiOpencv, SiHuggingface, SiGoogle } from "react-icons/si";
import orangeLogo from "../assets/img/orange-logo.png";
import atbLogo from "../assets/img/atb-logo.png";
import artiLogo from "../assets/img/addminn-logo.webp";

// Utiliser FaChartLine comme alternative à l'icône Power BI
const SiPowerbi = FaChartLine;

const experiences = [
  {
    id: 1,
    role: "Data Scientist Intern",
    company: "Orange Tunisia",
    period: "Feb 2025 - Aug 2025",
    location: "Tunis, Tunisia",
    logo: orangeLogo,
    videoDemo: "/videos/orange_compressed.mp4",
    highlights: [
      "Built churn prediction model with 90% recall and performed customer segmentation using K-Means clustering, achieving a Silhouette Score of 0.85",
      "Leveraged Qwen 2.5 LLMs with advanced prompt engineering to generate personalized marketing content",
      "Deployed a Django web application with real-time predictions, secure authentication, and Docker containerization for scalability"
    ],
    technologies: ["Python", "Machine Learning", "Django", "Docker", "LLMs", "Prompt Engineering"]
  },
  {
    id: 2,
    role: "Data Scientist Intern",
    company: "ATB (Arab Tunisian Bank)",
    period: "Aug 2024 - Sep 2024",
    location: "Tunis, Tunisia",
    logo: atbLogo,
    videoDemo: "/videos/atb.mp4",
    highlights: [
      "Built an OCR-based cheque autocorrection system using KNN and NLP to detect and correct mismatches between digits and words, achieving 92% accuracy",
      "Developed and deployed a Django web application with Power BI dashboards for real-time monitoring, reporting, and improved cheque validation efficiency"
    ],
    technologies: ["Python", "OpenCV", "Tesseract", "Django", "Power BI", "NLP"]
  },
  {
    id: 3,
    role: "Data Analyst Intern",
    company: "Artibedded",
    period: "Sep 2023 - Dec 2023",
    location: "Tunis, Tunisia",
    logo: artiLogo,
    highlights: [
      "Collected and processed data from web scraping and LLM-driven pipelines, performing data cleaning, preprocessing, and feature engineering for analysis",
      "Conducted exploratory data analysis (EDA) and created visualizations to derive actionable insights"
    ],
    technologies: ["Python", "Data Analysis", "Web Scraping", "LLMs", "Data Visualization"]
  }
];

const ExperienceCard = ({ experience, index }) => {
  const [showVideo, setShowVideo] = useState(false);

  const getIcon = (tech) => {
    const icons = {
      'Python': <SiPython className="me-1" />,
      'Django': <SiDjango className="me-1" />,
      'Docker': <SiDocker className="me-1" />,
      'Power BI': <SiPowerbi className="me-1" />,
      'OpenCV': <SiOpencv className="me-1" />,
      'Tesseract': <SiGoogle className="me-1" />,
      'LLMs': <SiHuggingface className="me-1" />
    };
    return icons[tech] || <FaChevronRight className="me-1" size={10} />;
  };

  // Fonction pour obtenir le chemin correct de la vidéo
  const getVideoPath = (videoPath) => {
    if (!videoPath) return null;
    if (videoPath.startsWith('http')) return videoPath;
    return process.env.PUBLIC_URL + videoPath;
  };

  return (
    <motion.div 
      className="experience-card mb-4 p-4 rounded-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="d-flex flex-column flex-md-row">
        <div className="me-md-4 mb-3 mb-md-0" style={{ minWidth: '80px' }}>
          <img 
            src={experience.logo} 
            alt={experience.company} 
            className="company-logo img-fluid"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              borderRadius: '12px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              padding: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/80/0A0A0A/FFFFFF?text=${experience.company.charAt(0)}`;
            }}
          />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-2">
            <div>
              <h4 className="mb-1 fw-bold">{experience.role}</h4>
              <h5 className="mb-1 text-primary">{experience.company}</h5>
            </div>
            <div className="text-muted mt-2 mt-md-0">
              <small>{experience.period}</small>
              <div className="d-flex align-items-center mt-1">
                <FaMapMarkerAlt className="me-1" size={12} />
                <small>{experience.location}</small>
              </div>
            </div>
          </div>
          
          <ul className="experience-highlights mt-3">
            {experience.highlights.map((item, idx) => (
              <li key={idx} className="mb-2 d-flex">
                <span className="me-2 text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="d-flex flex-wrap gap-2 mb-3">
            {experience.technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">
                {getIcon(tech)}
                {tech}
              </span>
            ))}
          </div>
          
          {experience.videoDemo && (
            <div className="mt-3">
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={() => setShowVideo(!showVideo)}
              >
                {showVideo ? 'Masquer la démo' : 'Voir la démo vidéo'}
              </button>
              
              {showVideo && (
                <div className="mt-3 ratio ratio-16x9">
                  <video 
                    src={getVideoPath(experience.videoDemo)} 
                    controls 
                    className="rounded"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Votre navigateur ne prend pas en charge la lecture de vidéos.
                  </video>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-5 bg-light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="section-title">Professional Experience</h2>
          <p className="text-muted">My journey and contributions in the field of Data Science</p>
        </motion.div>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;