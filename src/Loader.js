import React, { useState, useEffect, useRef } from 'react';
import './Loader.css';

// Import your loading images from the src/assets folder
import loaderImage1 from './assets/loader1.png';
import loaderImage2 from './assets/loader2.png';
import loaderImage3 from './assets/loader3.png';

const Loader = ({ onLoaded }) => {
  // State to manage the animation phase (1 through 5)
  const [phase, setPhase] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    // A sequence of timers to advance the animation through its phases
    const phase2Timer = setTimeout(() => setPhase(2), 1200); // Show the second image
    const phase3Timer = setTimeout(() => setPhase(3), 2400); // Start the combination animation
    const phase4Timer = setTimeout(() => setPhase(4), 3200); // Show the result image
    const phase5Timer = setTimeout(() => setPhase(5), 4500); // Start the final exit animation

    // Cleanup all timers if the component unmounts
    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(phase4Timer);
      clearTimeout(phase5Timer);
    };
  }, []);

  // Effect to handle the end of the final exit animation
  useEffect(() => {
    // When we enter the final phase, listen for the animation to end
    if (phase === 5) {
      const loaderElement = loaderRef.current;
      const handleAnimationEnd = (event) => {
        // Ensure the event is from the main container's exit animation
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
        {/* Image 1 */}
        <img
          src={loaderImage1}
          alt="Element 1"
          className={`loader-image one ${phase >= 1 ? 'visible' : ''} ${phase >= 3 ? 'combine' : ''}`}
        />
        {/* Plus Sign */}
        <span className={`plus-sign ${phase >= 2 ? 'visible' : ''} ${phase >= 3 ? 'combine' : ''}`}>
          +
        </span>
        {/* Image 2 */}
        <img
          src={loaderImage2}
          alt="Element 2"
          className={`loader-image two ${phase >= 2 ? 'visible' : ''} ${phase >= 3 ? 'combine' : ''}`}
        />
        {/* Result Image */}
        <img
          src={loaderImage3}
          alt="Result"
          className={`loader-image three ${phase >= 4 ? 'visible' : ''}`}
        />
      </div>
      <p className="loader-text">
        Initializing Technologia
        <span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </p>
    </div>
  );
};

export default Loader;
