import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h2 className="section-title mb-4">About Me</h2>
            <div className="about-content">
              <p className="lead">
                I'm a passionate developer with expertise in building modern web applications.
                I love turning ideas into reality through clean and efficient code.
              </p>
              <p>
                With a strong foundation in web technologies, I enjoy creating responsive and 
                user-friendly interfaces that provide great user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open source, or enjoying outdoor activities.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
