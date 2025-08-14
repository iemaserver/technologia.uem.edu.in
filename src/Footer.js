import React from 'react';
import './Footer.css';
import uemLogo from './assets/UEM_LOGO.jpg';
// Import icons from react-icons
import { FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Anime-style decorative elements */}
      <div className="anime-particle particle-1">✦</div>
      <div className="anime-particle particle-2">★</div>
      <div className="anime-particle particle-3">⚡</div>
      <div className="anime-particle particle-4">🎮</div>
      <div className="anime-particle particle-5">⚔️</div>
      <div className="anime-particle particle-6">🎯</div>
      <div className="anime-particle particle-7">🔥</div>
      
      <div className="footer-content">
        <div className="footer-section">
          <h3>Organised By</h3>
          <div className="uem-info">
            <div className="uem-logo">
              <img src={uemLogo} alt="UEM Logo" className="uem-logo-img" />
            </div>
            <p className="uem-name">University Of Engineering and Management, Kolkata</p>
            <p className="uem-address">Department Of Robotics & AI</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <div className="contact-info">
            <p><strong>Rajeet Ash:</strong> +91 93305 15069</p>
            <p><strong>Ananta Pathak:</strong> +91 81599 84138</p>
            <p><strong>Ranasurya Ghosh:</strong> +91 91441 75874</p>
            <p><strong>Sourya Sinha:</strong> +91 70636 39502</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">📝 Idea Submission</a></li>
            <li><a href="#" className="footer-link">📖 Players Guide</a></li>
            <li><a href="#" className="footer-link">🤝 Become a Partner</a></li>
            <li><a href="#" className="footer-link">⚔️ Rules</a></li>
          </ul>
        </div>

                          <div className="footer-section">
           <h3>Socials</h3>
           <div className="social-links">
             <a href="https://www.instagram.com/technologiaa.india?igsh=NTl3eWh6bmRqdHU5" className="social-link" target='_blank' rel="noopener noreferrer">
               <FaInstagram />
               <span>Instagram</span>
             </a>
             <a href="#" className="social-link">
               <FaLinkedin />
               <span>LinkedIn</span>
             </a>
             <a href="https://x.com/technologiaa_?t=192UB0oJFPc4XjBqbdLISQ&s=08 " className="social-link" target='_blank' rel="noopener noreferrer">
               <FaXTwitter />
               <span>Twitter</span>
             </a>
             <a href="#" className="social-link">
               <FaDiscord />
               <span>Discord</span>
             </a>
           </div>
         </div>

         <div className="footer-section">
           <h3>Location</h3>
           <div className="map-container">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14738.005492556798!2d88.490282!3d22.560344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b007af9ca31%3A0xa3a41f4146303146!2sUEM!5e0!3m2!1sen!2sin!4v1755184491147!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{border:0}} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="UEM Location"
             />
           </div>
         </div>
      </div>
      
      <div className="footer-bottom">
        <div className="sparkle sparkle-left">⚡</div>
        <p>&copy; 2025 Technologia. All rights reserved.</p>
        <div className="sparkle sparkle-right">⚡</div>
      </div>
      
      <div className="gaming-status">
        <div className="status-item">
          <span className="status-label">STATUS:</span>
          <span className="status-value online">ONLINE</span>
        </div>
        <div className="status-item">
          <span className="status-label">PLAYERS:</span>
          <span className="status-value">∞</span>
        </div>
        <div className="status-item">
          <span className="status-label">SERVER:</span>
          <span className="status-value">ACTIVE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
