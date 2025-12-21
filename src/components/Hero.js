// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import profileImage from '../assets/img/profile_image.JPG';

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
            <span className="hero-subtitle">Hello, I'm</span>
            <h1 className="hero-title">Hadil Sahraoui</h1>
            <h2 className="hero-role">
              <span className="role-text">Data Engineer</span>
              <span className="role-divider"> & </span>
              <span className="role-text">Data Scientist</span>
            </h2>
            <p className="hero-description">
              Building scalable data pipelines, intelligent models, and transforming data into actionable insights that drive business value.
            </p>
            
            <div className="hero-buttons">
              <motion.a 
                href="#contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              
            </div>

            <div className="hero-social">
              <motion.a 
                href="https://github.com/hadsa129" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: 'var(--accent-olive)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/hadil-sahraoui/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: 'var(--accent-teal)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="mailto:hadil.sahraoui129@gmail.com"
                whileHover={{ y: -3, color: 'var(--accent-beige)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaEnvelope />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="profile-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          >
            <div className="profile-img-wrapper">
              <img 
                src={profileImage} 
                alt="Hadil Sahraoui" 
                className="profile-img"
              />
            </div>
          </motion.div>

          
        </div>
        
        <motion.div 
          className="scroll-down"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              repeat: Infinity, 
              repeatType: 'reverse',
              duration: 1.5 
            } 
          }}
        >
          <a href="#about" className="scroll-link">
            <FaArrowDown className="scroll-icon" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;