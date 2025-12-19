// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import profileImage from '../assets/img/profile.png'; // You'll need to add your profile image

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h6 className="hero-subtitle">Hello, I'm</h6>
            <h1 className="hero-title">Hadil Sahraoui</h1>
            <h2 className="hero-role">Data Engineer & Data Scientist</h2>
            <p className="hero-description">
              Building scalable data pipelines, intelligent models, and actionable insights.
            </p>
            
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                Contact Me
              </a>
              <a 
                href="/path-to-your-resume.pdf" 
                className="btn btn-outline"
                download
              >
                <FaFileDownload className="me-2" />
                Download CV
              </a>
            </div>

            <div className="hero-social">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/hadil-sahraoui/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:hadil.sahraoui129@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-wrapper">
              <img 
                src={profileImage} 
                alt="Hadil Sahraoui" 
                className="profile-image"
              />
              <div className="hero-shape"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;