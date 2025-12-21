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
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  if (loading) {
    return <Loader />;
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
