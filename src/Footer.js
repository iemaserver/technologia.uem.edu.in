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
          <h3>Organised By <span className="japanese-subtitle">主催者</span></h3>
          <div className="uem-info">
            <div className="uem-logo">
              <img src={uemLogo} alt="UEM Logo" className="uem-logo-img" />
            </div>
            <p className="uem-name">University Of Engineering and Management, Kolkata</p>
            <p className="japanese-text">エンジニアリング・マネジメント大学</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contacts <span className="japanese-subtitle">連絡先</span></h3>
          <div className="contact-info">
            <p><strong>Rajeet Ash:</strong> +91 9330515069</p>
            {/* <p><strong>Alik Agrawala:</strong> 9733502597</p> */}
            <p className="japanese-text">📞 お問い合わせ</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Resources <span className="japanese-subtitle">リソース</span></h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">📝 Idea Submission Template <span className="japanese-text">アイデア提出テンプレート</span></a></li>
            <li><a href="#" className="footer-link">📖 Players Guide <span className="japanese-text">プレイヤーズガイド</span></a></li>
            <li><a href="#" className="footer-link">🤝 Become a Partner <span className="japanese-text">パートナーになる</span></a></li>
            <li><a href="#" className="footer-link">⚔️ Rules of the Arena <span className="japanese-text">アリーナのルール</span></a></li>
            <li><a href="#" className="footer-link">🏆 Season 1 Hackathon <span className="japanese-text">シーズン1ハッカソン</span></a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Socials <span className="japanese-subtitle">ソーシャル</span></h3>
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
        <p>&copy; 2025 Technologia. All rights reserved.</p>
        <p className="japanese-text">テクノロジア © 2025 全著作権所有</p>
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
