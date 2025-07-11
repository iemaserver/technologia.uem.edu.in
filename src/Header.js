import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';
import logo from './assets/logo.png';


const Header = ({ activeScreen, setActiveScreen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (screen) => {
    setActiveScreen(screen);
    setIsMenuOpen(false); 
  };

  return (
    <header className="app-header">
      
      <div className="header-logo" onClick={() => handleNavClick('home')}>
        <img src={logo} alt="Technologia Logo" />
      </div>

      <h1 className="header-title" onClick={() => handleNavClick('home')}>
        Technologiaaa
      </h1>

      <nav className="header-nav">
        <div 
          className={`nav-menu-icon ${isMenuOpen ? 'menu-is-open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
       
        <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
          
          <li>
            <button onClick={() => handleNavClick('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('register')}>Register</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('about')}>About</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('schedule')}>Schedule</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
