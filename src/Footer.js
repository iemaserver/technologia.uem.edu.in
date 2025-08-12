import React from 'react';
import './Footer.css';
import uemLogo from './assets/logo.png';
// Import icons from react-icons
import { FaInstagram, FaLinkedin, FaDiscord, FaFacebook } from 'react-icons/fa';
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
          <h3>主催者 <span className="japanese-subtitle">Organised By</span></h3>
          <div className="uem-info">
            <div className="uem-logo">
              <img src={uemLogo} alt="UEM Logo" className="uem-logo-img" />
            </div>
            <p className="uem-name">University Of Engineering and Management, Kolkata</p>
            <p className="japanese-text">エンジニアリング・マネジメント大学</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>連絡先 <span className="japanese-subtitle">Contacts</span></h3>
          <div className="contact-info">
            <p><strong>Avik Agrarwala:</strong> 8101531919</p>
            <p><strong>Alik Agrawala:</strong> 9733502597</p>
            <p className="japanese-text">📞 お問い合わせ</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>リソース <span className="japanese-subtitle">Resources</span></h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">📝 アイデア提出テンプレート <span className="english-text">Idea Submission Template</span></a></li>
            <li><a href="#" className="footer-link">📖 プレイヤーズガイド <span className="english-text">Players Guide</span></a></li>
            <li><a href="#" className="footer-link">🤝 パートナーになる <span className="english-text">Become a Partner</span></a></li>
            <li><a href="#" className="footer-link">⚔️ アリーナのルール <span className="english-text">Rules of the Arena</span></a></li>
            <li><a href="#" className="footer-link">🏆 シーズン1ハッカソン <span className="english-text">Season 1 Hackathon</span></a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>ソーシャル <span className="japanese-subtitle">Socials</span></h3>
          <div className="social-links">
            <a href="https://www.instagram.com/technologiaa.india?igsh=NTl3eWh6bmRqdHU5" className="social-link" target='_blank' rel="noopener noreferrer">
              <FaInstagram />
              <span>Instagram</span>
              <span className="japanese-text">インスタグラム</span>
            </a>
            <a href="#" className="social-link">
              <FaLinkedin />
              <span>LinkedIn</span>
              <span className="japanese-text">リンクトイン</span>
            </a>
            <a href="https://x.com/technologiaa_?t=192UB0oJFPc4XjBqbdLISQ&s=08 " className="social-link" target='_blank' rel="noopener noreferrer">
              <FaXTwitter />
              <span>Twitter</span>
              <span className="japanese-text">ツイッター</span>
            </a>
            <a href="#" className="social-link">
              <FaDiscord />
              <span>Discord</span>
              <span className="japanese-text">ディスコード</span>
            </a>
            <a href="#" className="social-link">
              <FaFacebook />
              <span>Facebook</span>
              <span className="japanese-text">フェイスブック</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="sparkle sparkle-left">⚡</div>
        <p>&copy; 2024 Technologia. All rights reserved.</p>
        <p className="japanese-text">テクノロジア © 2024 全著作権所有</p>
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
