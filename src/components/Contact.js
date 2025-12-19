// src/components/Contact.js
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMedium, FaPaperPlane } from 'react-icons/fa';
import 'animate.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <Row className="contact-content">
          <Col lg={5} className="mb-5 mb-lg-0">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Contact Information</h3>
              <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:hadil.sahraoui129@gmail.com" className="contact-link">
                      hadil.sahraoui129@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaLinkedin />
                  </div>
                  <div className="contact-text">
                    <h4>LinkedIn</h4>
                    <a 
                      href="https://linkedin.com/in/hadil-sahraoui/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      linkedin.com/in/hadil-sahraoui/
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaGithub />
                  </div>
                  <div className="contact-text">
                    <h4>GitHub</h4>
                    <a 
                      href="https://github.com/hadsa129" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      github.com/hadsa129
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMedium />
                  </div>
                  <div className="contact-text">
                    <h4>Medium</h4>
                    <a 
                      href="https://medium.com/@hadil.sahraoui129" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      medium.com/@hadil.sahraoui129
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>

          <Col lg={7}>
            <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                className="contact-form-element"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <Row>
                  <Col md={6} className="mb-4">
                    <Form.Group controlId="formName">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Form.Group controlId="formEmail">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group controlId="formSubject" className="mb-4">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    placeholder="Enter subject" 
                    required 
                  />
                </Form.Group>
                
                <Form.Group controlId="formMessage" className="mb-4">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="message" 
                    rows={5} 
                    placeholder="Enter your message" 
                    required 
                  />
                </Form.Group>
                
                <Button type="submit" className="submit-btn">
                  <FaPaperPlane className="me-2" /> Send Message
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;