import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';
import logo from './logo.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header">
      {/* Logo Section */}
      <div className="header-logo">
        {/* Use the imported logo variable in the src attribute */}
        <img src={logo} alt="Technologia Logo" />
      </div>

      {/* Centered Title - hidden on mobile to make space */}
      <h1 className="header-title">Technologia</h1>

      {/* Navigation Section */}
      <nav className="header-nav">
        <div className="nav-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
        <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
          <li><a href="#register" onClick={() => setIsMenuOpen(false)}>Register</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#schedule" onClick={() => setIsMenuOpen(false)}>Schedule</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
