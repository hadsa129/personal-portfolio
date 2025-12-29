// src/App.js
import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import Loader from './components/Loader';

const ScrollToSection = () => {
  const { section } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [section, location.pathname]);

  return null;
};

const AppContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Effet pour gérer le défilement lors du chargement initial
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="learning-path">
        <LearningPath />
      </div>
      <div id="resumes">
        <Resumes />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <ScrollToSection />
              <AppContent />
            </>
          } />
          <Route path="/:section" element={
            <>
              <ScrollToSection />
              <AppContent />
            </>
          } />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
