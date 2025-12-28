import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const NavBar = ({ scrolled }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Ajustez cette valeur en fonction de la hauteur de votre barre de navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Mettre à jour le lien actif basé sur l'URL actuelle
    const path = location.pathname.substring(1) || 'home';
    setActiveLink(path);
    
    // Faire défiler jusqu'à la section correspondante après un court délai
    const timer = setTimeout(() => {
      scrollToSection(path);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location]);

  const closeNavbar = () => {
    setExpanded(false);
  };

  const navLinks = [
    { to: "", label: "Home" },
    { to: "skills", label: "Skills" },
    { to: "projects", label: "Projects" },
    { to: "experience", label: "Experience" },
    { to: "learning-path", label: "Learning Path" },
    { to: "resumes", label: "Resumes" },
    { to: "contact", label: "Contact" },
  ];

  const socialIcons = [
    { icon: <FaGithub />, url: "https://github.com/hadsa129" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/hadil-sahraoui/" },
    { icon: <FaEnvelope />, url: "mailto:hadil.sahraoui129@gmail.com" },
  ];

  return (
    <Navbar 
      expand="lg" 
      className={scrolled ? "scrolled" : ""}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <span>HS</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={`/${link.to}`}
                  className={`nav-link ${activeLink === (link.to || 'home') ? 'active' : ''}`}
                  onClick={() => {
                    closeNavbar();
                    setActiveLink(link.to || 'home');
                  }}
                >
                  {link.label}
                </Link>
            ))}
          </Nav>
          
          <div className="d-flex align-items-center">
            <div className="social-icon">
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.url.split('/')[2]}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
