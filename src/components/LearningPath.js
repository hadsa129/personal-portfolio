import React from 'react';
import { Element } from 'react-scroll';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import './LearningPath.css';

// Local image for the roadmap
const roadmapGif = `${process.env.PUBLIC_URL}/images/learning-roadmap.jpg`;

const LearningPath = () => {
  const pillars = [
    {
      title: "Mathematical Foundations",
      description: "The Engine Behind the Magic",
      icon: "🧮",
      content: (
        <>
          <p>You don't need a PhD—but you do need intuition. This module demystifies the math that powers algorithms:</p>
          <ul>
            <li><strong>Linear Algebra</strong>: Vectors, matrices, and eigenvalues—the language of neural networks</li>
            <li><strong>Differential Calculus</strong>: Gradients and how models "learn" via optimization</li>
            <li><strong>Statistics & Probability</strong>: From distributions to hypothesis testing</li>
          </ul>
          <p className="text-muted">💡 Each topic includes PDF resources and interactive code examples</p>
        </>
      )
    },
    {
      title: "Python & Data Wrangling",
      description: "Your Daily Toolkit",
      icon: "🐍",
      content: (
        <>
          <p>Master the essential tools for data manipulation and exploration:</p>
          <ul>
            <li><strong>Core Python</strong>: Variables, loops, functions, OOP</li>
            <li><strong>NumPy</strong>: Fast numerical operations on arrays</li>
            <li><strong>Pandas</strong>: Data cleaning, filtering, and transformation</li>
            <li><strong>Data Visualization</strong>: Create compelling plots with Matplotlib and Seaborn</li>
          </ul>
        </>
      )
    },
    {
      title: "Exploratory Data Analysis",
      description: "The Detective Work",
      icon: "🔍",
      content: (
        <>
          <p>Before modeling, you explore. Good EDA prevents garbage-in-garbage-out:</p>
          <ul>
            <li>Diagnose missing values and outliers</li>
            <li>Engineer meaningful features</li>
            <li>Uncover correlations and hidden patterns</li>
          </ul>
          <p>📊 <strong>Example</strong>: Practice with real-world datasets like <code>house_prices_with_issues.csv</code></p>
        </>
      )
    },
    {
      title: "Machine Learning",
      description: "From Theory to Deployment",
      icon: "🤖",
      content: (
        <>
          <p>Move beyond tutorials to production-ready thinking:</p>
          <ul>
            <li><strong>Supervised Learning</strong>: Regression, classification algorithms</li>
            <li><strong>Unsupervised Learning</strong>: Clustering, dimensionality reduction</li>
            <li><strong>Model Validation</strong>: Cross-validation and metrics</li>
          </ul>
          <p>🚀 Includes end-to-end project: Problem definition → data → model → deployment</p>
        </>
      )
    },
    {
      title: "Deep Learning & AI",
      description: "The Frontier",
      icon: "🧠",
      content: (
        <>
          <p>Unlock modern AI capabilities:</p>
          <ul>
            <li><strong>Neural Networks</strong>: Architecture and training</li>
            <li><strong>Computer Vision</strong>: Build CNNs with TensorFlow/Keras</li>
            <li><strong>NLP</strong>: From TF-IDF to transformers</li>
          </ul>
          <p>🤖 Train models that understand text and recognize images</p>
        </>
      )
    }
  ];

  return (
    <Element name="learning-path">
      <section className="learning-path-section">
        <Container>
          <div className="section-title text-center mb-5">
            <span className="badge bg-primary mb-3">Learning Resource</span>
            <h2>Data Science Learning Path</h2>
            <p className="lead">From Zero to AI: A Structured Journey</p>
          </div>
          
          <Row className="align-items-center mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="roadmap-preview mb-4">
                <img 
                  src={roadmapGif} 
                  alt="Data Science Learning Roadmap" 
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="text-center">
                <a 
                  href="https://github.com/hadsa129/data-science-learning-path" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Explore Full Curriculum <FaArrowRight className="ms-2" />
                </a>
              </div>
            </Col>
            <Col lg={6}>
              <div className="learning-path-highlights p-4">
                <h3 className="h4 mb-4">What You'll Learn</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>✓ Core Concepts:</strong> Python, NumPy, Pandas, Data Visualization
                  </li>
                  <li className="mb-3">
                    <strong>✓ Machine Learning:</strong> Algorithms, model evaluation, deployment
                  </li>
                  <li className="mb-3">
                    <strong>✓ Deep Learning:</strong> Neural networks, CNNs, NLP
                  </li>
                  <li className="mb-3">
                    <strong>✓ Real Projects:</strong> Hands-on experience with real datasets
                  </li>
                </ul>
                <p className="mt-4">
                  This comprehensive path includes Jupyter notebooks, PDF resources, and practical exercises to help you master data science through hands-on learning.
                </p>
              </div>
            </Col>
          </Row>
          

          <Row className="justify-content-center">
            <Col lg={10}>
              <Accordion defaultActiveKey="0" className="learning-path-accordion">
                {pillars.map((pillar, index) => (
                  <Card key={index} className="mb-3">
                    <Accordion.Toggle as={Card.Header} eventKey={String(index)} className="pillar-header">
                      <div className="d-flex align-items-center">
                        <span className="pillar-icon">{pillar.icon}</span>
                        <div>
                          <h5 className="mb-0">{pillar.title}</h5>
                          <p className="mb-0 text-muted">{pillar.description}</p>
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={String(index)}>
                      <Card.Body className="pillar-content">
                        {pillar.content}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
          </Row>

          <div className="cta-section text-center py-5 mt-5 bg-light rounded">
            <h3 className="mb-4">Ready to Start Your Data Science Journey?</h3>
            <p className="lead mb-4">Access all learning materials, code examples, and project files on GitHub</p>
            <div className="d-flex justify-content-center gap-3">
              <Button 
                href="https://github.com/hadsa129/data-science-learning-path" 
                target="_blank" 
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="px-4"
              >
                <FaGithub className="me-2" /> View on GitHub
              </Button>
              <Button 
                href="#learning-path"
                variant="outline-primary"
                size="lg"
                className="px-4"
              >
                Explore Curriculum
              </Button>
            </div>
            <p className="mt-3 text-muted mb-0">
              <small>MIT Licensed • Open Source • Community Driven</small>
            </p>
          </div>
        </Container>
      </section>
    </Element>
  );
};

export default LearningPath;
