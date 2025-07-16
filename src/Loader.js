import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

// Import your loading images from the src/assets folder
import loaderImage1 from './assets/loader1.png';
import loaderImage2 from './assets/loader2.png';
import loaderImage3 from './assets/loader3.png';

const Loader = ({ onLoaded }) => {
  // Refs for all the elements we're going to animate
  const containerRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const plusRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for the entire loading sequence
    const tl = gsap.timeline({
      // When the timeline is complete, call the onLoaded function from App.js
      onComplete: onLoaded,
    });

    // Set initial states
    gsap.set([image1Ref.current, image2Ref.current, image3Ref.current, plusRef.current], { autoAlpha: 0 });

    // Animation Sequence
    tl
      // Phase 1: Image 1 slides in
      .to(image1Ref.current, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, "+=0.5")
      // Phase 2: Plus sign and Image 2 appear
      .to(plusRef.current, { autoAlpha: 1, duration: 0.3 })
      .to(image2Ref.current, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, "-=0.2")
      // Phase 3: Images combine
      .to([image1Ref.current, image2Ref.current], { x: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' }, "+=0.8")
      .to([image1Ref.current, image2Ref.current, plusRef.current], { autoAlpha: 0, duration: 0.3 }, "-=0.2")
      // Phase 4: Result image pops in with a shockwave effect
      .fromTo(image3Ref.current, 
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
      .fromTo(containerRef.current, 
        { '--shockwave-scale': 0, '--shockwave-opacity': 1 },
        { '--shockwave-scale': 1, '--shockwave-opacity': 0, duration: 0.7, ease: 'power2.out' }, "-=0.6"
      )
      // Phase 5: Fade out the entire loader
      .to([image3Ref.current, textRef.current], { autoAlpha: 0, duration: 0.5 }, "+=1")
      .to(containerRef.current, { autoAlpha: 0, duration: 0.8 });

  }, [onLoaded]);

  return (
    <div className="loader-container" ref={containerRef}>
      <div className="animation-stage">
        <img ref={image1Ref} src={loaderImage1} alt="Element 1" className="loader-image one" />
        <span ref={plusRef} className="plus-sign">+</span>
        <img ref={image2Ref} src={loaderImage2} alt="Element 2" className="loader-image two" />
        <img ref={image3Ref} src={loaderImage3} alt="Result" className="loader-image three" />
      </div>
      <p className="loader-text" ref={textRef}>
        Initializing Technologia...
      </p>
    </div>
  );
};

export default Loader;
