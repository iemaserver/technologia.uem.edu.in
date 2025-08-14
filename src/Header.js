import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';
import logo from './assets/logo.png'; // Your static logo

import tlogo from './assets/technologia_logo.png'; // Your static logo

// import AnimatedLogo from './AnimatedLogo'; // Import the new animated logo

const Header = ({ setActiveScreen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (screen) => {
    setActiveScreen(screen);
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      {/* Wrapper for all left-aligned items */}
      <div className="header-left">
        <div className="header-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-container">
            <img src={logo} alt="UEM Logo" className="logo-image" />
            <div className="logo-divider"></div>
            <img src={tlogo} alt="Technologia Logo" className="logo-image" />
          </div>
        </div>
        {/* The new animated logo component */}
        {/* <AnimatedLogo /> */}
        <h1 className="header-title" onClick={() => handleNavClick('home')}>
          Technologia
        </h1>
      </div>

      <nav className="header-nav">
        <div 
          className={`nav-menu-icon ${isMenuOpen ? 'menu-is-open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
        
        <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
          <li><button onClick={() => handleNavClick('home')}>Home</button></li>
          <li><button onClick={() => handleNavClick('register')}>Register</button></li>
          <li><button onClick={() => handleNavClick('about')}>About</button></li>
          <li><button onClick={() => handleNavClick('timeline')}>Timeline</button></li>
          <li><button onClick={() => handleNavClick('team')}>Team</button></li>
          <li><button onClick={() => handleNavClick('partners')}>Partners</button></li>
          <li><button onClick={() => handleNavClick('faq')}>FAQ</button></li>
          <li><button onClick={() => handleNavClick('contact')}>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
