import React from 'react';
import './Home.css';
import TechnologiaHeading from './TechnologiaHeading';

// --- Components are now imported directly ---
import About from './About';
import Timeline from './Timeline';
import Partners from './Partners';
import FAQ from './FAQ';

const Home = () => {
  // Function to handle the animated redirect for the register button
  const handleRegisterClick = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.add('animate-out');

    setTimeout(() => {
      window.open('https://unstop.com/o/C2EIrNl', '_blank');
      button.classList.remove('animate-out');
    }, 500);
  };

  return (
    <div className="home-page-wrapper">
      {/* This is the main "hero" section */}
      <div className="home-container">
        <TechnologiaHeading />
        <p>The digital realm holds its breath. Soon, the gates will open for challengers to forge their legacy in code and creativity. Prepare yourselves.</p>
        <a 
          href="https://unstop.com/o/C2EIrNl" 
          className="register-button" 
          onClick={handleRegisterClick}
          target="_blank" 
          rel="noopener noreferrer"
        >
          Register Now
        </a>
      </div>
      
      {/* All sections are now rendered directly */}
      <About />
      <Timeline />
      <Partners />
      <FAQ />
    </div>
  );
};

export default Home;