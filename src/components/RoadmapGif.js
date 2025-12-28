import React, { memo } from 'react';

const RoadmapGif = memo(() => {
  return (
    <div className="position-relative" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
        <img 
          src={process.env.PUBLIC_URL + '/images/roadmap.gif'}
          alt="Data Science Learning Path"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center top'
          }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-center" 
             style={{ 
               padding: '1rem',
               background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
             }}>
          <a 
            href="https://github.com/hadsa129/data-science-learning-path" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              color: '#000',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1.25rem',
              fontSize: '0.8rem',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            View Full Learning Path
          </a>
        </div>
      </div>
    </div>
  );
});

export default RoadmapGif;
