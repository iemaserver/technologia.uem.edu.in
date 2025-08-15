import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';
import logo from './assets/logo.png';
import tlogo from './assets/technologia_logo.png';
import iemLogo from './assets/iem_logo.png';

const Header = ({ setActiveScreen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (screen) => {
    setActiveScreen(screen);
    setIsMenuOpen(false);
    // --- FIX: Scroll to the top of the page on navigation ---
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-container">
            <img src={logo} alt="UEM Logo" className="logo-image" />
            <div className="logo-divider"></div>
            <img src={iemLogo} alt="IEM Logo" className="logo-image" id="iemlogo"/>
            <div className="logo-divider"></div>
            <img src={tlogo} alt="Technologia Logo" className="logo-image" />
          </div>
        </div>
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
          <li><button onClick={() => handleNavClick('about')}>About</button></li>
          <li><button onClick={() => handleNavClick('timeline')}>Timeline</button></li>
          <li><button onClick={() => handleNavClick('team')}>Team</button></li>
          <li><button onClick={() => handleNavClick('guidance')}>Guidance</button></li>
          <li><button onClick={() => handleNavClick('partners')}>Partners</button></li>
          <li><button onClick={() => handleNavClick('faq')}>FAQ</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;