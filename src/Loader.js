import React, { useState, useEffect, useRef } from 'react';
import './Loader.css';

import loaderImage1 from './assets/loader1.png';
import loaderImage2 from './assets/loader2.png';
import loaderImage3 from './assets/loader3.png';

const Loader = ({ onLoaded }) => {
    
  const [phase, setPhase] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    
    const phase2Timer = setTimeout(() => setPhase(2), 1200); 
    const phase3Timer = setTimeout(() => setPhase(3), 2400); 
    const phase4Timer = setTimeout(() => setPhase(4), 3200);
    const phase5Timer = setTimeout(() => setPhase(5), 4500);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(phase4Timer);
      clearTimeout(phase5Timer);
    };
  }, []);

  useEffect(() => {
    
    if (phase === 5) {
      const loaderElement = loaderRef.current;
      const handleAnimationEnd = (event) => {
      
        if (event.animationName === 'exitFade') {
          if (onLoaded) onLoaded();
        }
      };
      loaderElement.addEventListener('animationend', handleAnimationEnd);
      return () => loaderElement.removeEventListener('animationend', handleAnimationEnd);
    }
  }, [phase, onLoaded]);

  return (
    <div ref={loaderRef} className={`loader-container ${phase === 5 ? 'exiting' : ''}`}>
      <div className="animation-stage">
      
        <img
          src={loaderImage1}
          alt="Element 1"
          className={`loader-image one ${phase >= 1 ? 'visible' : ''} ${phase >= 3 ? 'combine' : ''}`}
        />
        
        <span className={`plus-sign ${phase >= 2 ? 'visible' : ''} ${phase >= 3 ? 'combine' : ''}`}>
          +
        </span>
        
        <img
          src={loaderImage2}
          alt="Element 2"
          className={`loader-image two ${phase >= 2 ? 'visible' : ''} ${phase >= 3 ? 'combine' : ''}`}
        />
       
        <img
          src={loaderImage3}
          alt="Result"
          className={`loader-image three ${phase >= 4 ? 'visible' : ''}`}
        />
      </div>
      <p className="loader-text">
        Initializing Technologiaaa
        <span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </p>
    </div>
  );
};

export default Loader;
