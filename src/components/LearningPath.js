import React from 'react';
import { Element } from 'react-scroll';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import './LearningPath.css';

// Using a placeholder image URL for the roadmap
const roadmapGif = 'https://via.placeholder.com/800x600/1a1a1a/D4BC9E?text=Learning+Roadmap+Placeholder';

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
          <div className="section-title">
            <h2>Data Science Learning Path</h2>
            <p>From Zero to AI: A Comprehensive Roadmap</p>
            
            <div className="github-badge">
              <a 
                href="https://github.com/hadsa129/data-science-learning-path" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-button"
              >
                <FaGithub /> Star on GitHub
              </a>
            </div>
          </div>
          
          <div className="roadmap-preview">
            <div className="roadmap-description">
              <h3>Your Journey to Data Science Mastery</h3>
              <p>This comprehensive learning path is designed to take you from absolute beginner to AI practitioner through hands-on projects and real-world applications. Each module builds upon the previous one, ensuring a solid foundation before moving to advanced topics.</p>
              
              <div className="key-features">
                <h4>What You'll Learn:</h4>
                <ul>
                  <li>Core mathematical concepts powering modern AI</li>
                  <li>Data manipulation and visualization with Python</li>
                  <li>Machine learning algorithms and model deployment</li>
                  <li>Deep learning and neural networks</li>
                  <li>Real-world project experience</li>
                </ul>
              </div>
              
              <a 
                href="https://github.com/hadsa129/data-science-learning-path" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary explore-button"
              >
                Explore Full Curriculum <FaArrowRight className="ms-2" />
              </a>
            </div>
            
            <div className="roadmap-gif">
              <img 
                src={roadmapGif} 
                alt="Data Science Learning Path Roadmap" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
          

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

          <div className="cta-section text-center mt-5">
            <h3>Ready to Start Your Data Science Journey?</h3>
            <p className="mb-4">Access all learning materials, code examples, and project files on GitHub</p>
            <a 
              href="https://github.com/hadsa129/data-science-learning-path" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg github-cta"
            >
              <FaGithub className="me-2" /> View on GitHub
            </a>
            <p className="mt-3 text-muted">
              <small>MIT Licensed • Open Source • Community Driven</small>
            </p>
          </div>
        </Container>
      </section>
    </Element>
  );
};

export default LearningPath;
