import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-scroll";

const NavBar = ({ scrolled }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const closeNavbar = () => {
    setExpanded(false);
  };

  const handleSetActive = (to) => {
    setActiveLink(to);
  };

  const navLinks = [
    { to: "home", label: "Home" },
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
              <Nav.Link
                key={link.to}
                as={Link}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className={`${activeLink === link.to ? 'active' : ''}`}
                onSetActive={() => handleSetActive(link.to)}
                onClick={closeNavbar}
              >
                {link.label}
              </Nav.Link>
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
