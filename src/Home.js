import React from 'react';
import './Home.css';
import TechnologiaHeading from './TechnologiaHeading';
import About from './About';
import Timeline from './Timeline';
import Partners from './Partners';
import FAQ from './FAQ';

// --- 1. Accept the animationsEnabled prop ---
const Home = ({ animationsEnabled }) => {

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
      <div className="home-container">
        <TechnologiaHeading />
        <p>The digital realm holds its breath. The gates have opened for challengers to forge their legacy in code and creativity. Challenge yourselves.</p>
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
      
      {/* --- 2. Pass the prop down to each section --- */}
      <About animationsEnabled={animationsEnabled} />
      <Timeline animationsEnabled={animationsEnabled} />
      <Partners animationsEnabled={animationsEnabled} />
      <FAQ animationsEnabled={animationsEnabled} />
    </div>
  );
};

export default Home;