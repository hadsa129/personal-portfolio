// src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Element } from 'react-scroll';
import './App.css';
import './theme.css';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resumes from './components/Resumes';
import LearningPath from './components/LearningPath';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let timer;
    
    // Fonction pour gérer le chargement
    const handleLoad = () => {
      timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    // Fonction pour gérer le défilement
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Vérifier si le contenu est déjà chargé
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    // Ajouter l'écouteur de défilement
    window.addEventListener('scroll', handleScroll);
    
    // Nettoyage
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#121212',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar scrolled={scrolled} />
        <main>
          <Element name="home">
            <Hero />
          </Element>
          <Element name="about">
            <About />
          </Element>
          <Element name="skills">
            <Skills />
          </Element>
          <Element name="projects">
            <Projects />
          </Element>
          <Element name="experience">
            <Experience />
          </Element>
          <Element name="resumes">
            <Resumes />
          </Element>
          <Element name="learning-path">
            <LearningPath />
          </Element>
          <Element name="contact">
            <Contact />
          </Element>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
