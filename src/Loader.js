import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loader.css';
// Import the anime quotes data
import quotesData from './data/anime_quotes_full.json';
// Import your main logo for the loader
import technologiaLogo from './assets/technologia_logo.png';

const Loader = ({ onLoaded }) => {
  const [quote, setQuote] = useState('');
  const containerRef = useRef(null);
  const quoteRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Select a random quote on component mount
    const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    setQuote(`"${randomQuote}"`);

    // GSAP Animation Timeline
    const tl = gsap.timeline({
      onComplete: onLoaded,
    });

    // Set initial states
    gsap.set(quoteRef.current, { opacity: 0, y: 20 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });

    tl
      // Animate the quote appearing
      .to(quoteRef.current, {
        duration: 1.5,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      }, "+=0.5")
      // Animate the logo appearing
      .to(logoRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: 'elastic.out(1, 0.75)',
      }, "-=0.5")
      // Hold for a moment, then fade everything out
      .to(containerRef.current, {
        duration: 1,
        opacity: 0,  // Changed from 100 to 0 for fade to black
        ease: 'power2.in',
      }, "+=1.5");

  }, [onLoaded]);

  return (
    <div className="loader-container-quotes" ref={containerRef}>
      <div className="quote-background">
        {/* Render multiple copies of the quote for the background effect */}
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} style={{ '--delay': `${Math.random() * 5}s` }}>{quote}</p>
        ))}
      </div>
      <div className="quote-content">
        <img src={technologiaLogo} alt="Technologia Logo" className="loader-logo" ref={logoRef} />
        <p className="main-quote" ref={quoteRef}>{quote}</p>
      </div>
    </div>
  );
};

export default Loader;
