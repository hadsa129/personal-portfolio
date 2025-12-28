import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { 
  FaChartLine, 
  FaChevronDown,
  FaChevronUp,
  FaPython,
  FaProjectDiagram as FaDeploy
} from 'react-icons/fa';
import { 
  SiPytorch,
  SiTensorflow
} from 'react-icons/si';
import { motion } from 'framer-motion';
import './LearningPath.css';
import RoadmapGif from './RoadmapGif';

const LearningPath = () => {
  const [activeKey, setActiveKey] = useState('0');

  const pillars = [
    {
      title: "Mathematical Foundations",
      description: "The Engine Behind the Magic",
      icon: <FaChartLine className="learning-icon" style={{ color: '#3498db', fontSize: '1.5rem' }} />,
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-3">Master the mathematical foundations that power modern data science and machine learning:</p>
          <ul className="learning-list">
            <li><strong>Linear Algebra</strong>: Vectors, matrices, and eigenvalues—the language of neural networks</li>
            <li><strong>Differential Calculus</strong>: Gradients and how models "learn" via optimization</li>
            <li><strong>Statistics & Probability</strong>: From distributions to hypothesis testing</li>
          </ul>
          <p className="text-muted">💡 Each topic includes PDF resources and interactive code examples</p>
        </motion.div>
      )
    },
    {
      title: "Python & Data Wrangling",
      description: "Your Daily Toolkit",
      icon: <FaPython className="learning-icon" style={{ color: '#3776AB', fontSize: '1.5rem' }} />,
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Master the essential tools for data manipulation and exploration:</p>
          <ul className="learning-list">
            <li><strong>Core Python</strong>: Variables, loops, functions, OOP</li>
            <li><strong>NumPy</strong>: Fast numerical operations on arrays</li>
            <li><strong>Pandas</strong>: Data cleaning, filtering, and transformation</li>
            <li><strong>Data Visualization</strong>: Create compelling plots with Matplotlib and Seaborn</li>
          </ul>
        </motion.div>
      )
    },
    {
      title: "Machine Learning",
      description: "From Theory to Practice",
      icon: <SiTensorflow className="learning-icon" style={{ color: '#FF6F00', fontSize: '1.5rem' }} />,
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Build intelligent systems with machine learning:</p>
          <ul className="learning-list">
            <li><strong>Supervised Learning</strong>: Regression and classification algorithms</li>
            <li><strong>Unsupervised Learning</strong>: Clustering and dimensionality reduction</li>
            <li><strong>Model Evaluation</strong>: Metrics and cross-validation</li>
            <li><strong>Feature Engineering</strong>: Creating meaningful features from raw data</li>
          </ul>
        </motion.div>
      )
    },
    {
      title: "Deep Learning",
      description: "Advanced Neural Networks",
      icon: <SiPytorch className="learning-icon" style={{ color: '#EE4C2C', fontSize: '1.5rem' }} />,
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Dive into the world of deep learning:</p>
          <ul className="learning-list">
            <li><strong>Neural Networks</strong>: Architecture and training</li>
            <li><strong>Computer Vision</strong>: CNNs and image processing</li>
            <li><strong>NLP</strong>: Text processing and transformers</li>
            <li><strong>Generative Models</strong>: GANs and VAEs</li>
          </ul>
        </motion.div>
      )
    },
    {
      title: "Real-world Projects",
      description: "Putting It All Together",
      icon: <FaDeploy className="learning-icon" style={{ color: '#6e5494', fontSize: '1.5rem' }} />,
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Apply your skills to real-world problems:</p>
          <ul className="learning-list">
            <li>End-to-end data science projects</li>
            <li>Model deployment and serving</li>
            <li>Performance optimization</li>
            <li>Best practices and production considerations</li>
          </ul>
        </motion.div>
      )
    }
  ];

  return (
    <section id="learning-path" className="py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="section-title display-5 fw-bold mb-3">Learning Path</h2>
          <p className="text-muted lead">My Learning Journey in Data Science</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Row className="g-4">
            <Col lg={6} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-4"
              >
                <RoadmapGif />
              </motion.div>
            </Col>
            
            <Col lg={6}>
              <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="learning-accordion">
                {pillars.map((pillar, index) => (
                  <Accordion.Item key={index} eventKey={String(index)} className="mb-3 border-0 shadow-sm">
                    <Accordion.Header className="pillar-header">
                      <div className="d-flex align-items-center justify-content-between w-100 pe-2">
                        <div className="d-flex align-items-center">
                          <div className="pillar-icon me-3">
                            {pillar.icon}
                          </div>
                          <div>
                            <h5 className="mb-0">{pillar.title}</h5>
                            <p className="mb-0 text-muted small">{pillar.description}</p>
                          </div>
                        </div>
                        {activeKey === String(index) ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="pillar-content">
                      {pillar.content}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
              
              <Card className="mt-4 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">What You'll Learn</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>✓ Core Concepts:</strong> Python, NumPy, Pandas, Data Visualization
                    </li>
                    <li className="mb-2">
                      <strong>✓ Machine Learning:</strong> Algorithms, model evaluation, deployment
                    </li>
                    <li className="mb-2">
                      <strong>✓ Deep Learning:</strong> Neural networks, CNNs, NLP
                    </li>
                    <li className="mb-2">
                      <strong>✓ Real Projects:</strong> Hands-on experience with real datasets
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default LearningPath;
