import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaPython, FaGithub,  FaDocker,  FaAws } from 'react-icons/fa';
import { SiApachespark, SiDatabricks, SiApachekafka, SiSnowflake, SiTableau, SiTensorflow, SiPytorch, SiFastapi, SiDjango, SiPostgresql, SiMongodb, SiMysql } from 'react-icons/si';
import { FaBrain } from 'react-icons/fa';  // Alternative à SiHuggingface
import { DiScrum } from 'react-icons/di';

const skillsData = [
  {
    category: 'Programming',
    items: [
      { name: 'Python', level: 90, icon: <FaPython /> },
      { name: 'SQL', level: 85, icon: <SiPostgresql /> },
      { name: 'Shell Scripting', level: 80, icon: <i className="fas fa-terminal"></i> },
    ]
  },
  {
    category: 'Data Engineering',
    items: [
      { name: 'Apache Spark', level: 85, icon: <SiApachespark /> },
      { name: 'Databricks', level: 90, icon: <SiDatabricks /> },
      { name: 'Delta Lake', level: 85, icon: <SiDatabricks /> },
      { name: 'Kafka', level: 75, icon: <SiApachekafka /> },
      { name: 'Airflow', level: 80, icon: <i className="fas fa-wind"></i> },
      { name: 'Snowflake', level: 85, icon: <SiSnowflake /> },
    ]
  },
  {
    category: 'Machine Learning & AI',
    items: [
      { name: 'TensorFlow', level: 85, icon: <SiTensorflow /> },
      { name: 'PyTorch', level: 80, icon: <SiPytorch /> },
      { name: 'Hugging Face', level: 85, icon: <FaBrain /> },
      { name: 'LangChain', level: 80, icon: <i className="fas fa-link"></i> },
      { name: 'RAG', level: 85, icon: <i className="fas fa-robot"></i> },
    ]
  },
  {
    category: 'Web & APIs',
    items: [
      { name: 'FastAPI', level: 85, icon: <SiFastapi /> },
      { name: 'Django', level: 85, icon: <SiDjango /> },
      { name: 'REST APIs', level: 90, icon: <i className="fas fa-code"></i> },
    ]
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', level: 85, icon: <SiPostgresql /> },
      { name: 'MongoDB', level: 80, icon: <SiMongodb /> },
      { name: 'MySQL', level: 85, icon: <SiMysql /> },
      { name: 'Microsoft SQL Server', level: 85, icon: <i className="fas fa-database"></i> },
    ]
  },
  {
    category: 'DevOps & Cloud',
    items: [
      { name: 'Docker', level: 90, icon: <FaDocker /> },
      { name: 'AWS', level: 80, icon: <FaAws /> },
      { name: 'Azure', level: 75, icon: <i className="fas fa-cloud"></i> },
      { name: 'Git', level: 90, icon: <FaGithub /> },
    ]
  },
  {
    category: 'Data Visualization',
    items: [
      { name: 'Power BI', level: 90, icon: <i className="fas fa-chart-bar"></i> },
      { name: 'Tableau', level: 85, icon: <SiTableau /> },
      { name: 'Matplotlib/Seaborn', level: 90, icon: <i className="fas fa-chart-line"></i> },
    ]
  },
  {
    category: 'Methodologies',
    items: [
      { name: 'ETL/ELT', level: 90, icon: <i className="fas fa-exchange-alt"></i> },
      { name: 'Agile/Scrum', level: 85, icon: <DiScrum /> },
      { name: 'CI/CD', level: 80, icon: <i className="fas fa-sync-alt"></i> },
    ]
  }
];

const SkillBar = ({ name, level, icon }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1.5, ease: 'easeOut' }
      });
    }
  }, [isInView, controls, level]);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-info">
        <span className="skill-name">
          <span className="skill-icon">{icon}</span> {name}
        </span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div 
          className="skill-progress"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Technical Toolkit</h2>
        <p className="text-center mb-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
          Here are the technologies and tools I work with to build data solutions and machine learning applications.
        </p>
        
        <motion.div 
          className="skills-container"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillsData.map((category, index) => (
            <motion.div 
              key={index} 
              className="skill-category"
              variants={itemVariants}
            >
              <h3>{category.category}</h3>
              {category.items.map((skill, skillIndex) => (
                <SkillBar 
                  key={skillIndex}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
