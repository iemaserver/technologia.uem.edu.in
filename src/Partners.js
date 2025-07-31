import React, { useEffect } from 'react';
import Section from './Section';
import anime from 'animejs';
import { 
  FaStar, 
  FaUtensils, 
  FaBookOpen, 
  FaTshirt,
  FaHeart,
  FaGraduationCap,
  FaGamepad
} from 'react-icons/fa';
import './partners.css';

const Partners = () => {
  const partnersData = {
    community: [
      { 
        name: 'Anime Fan Club', 
        logo: 'https://i.imgur.com/JQK1m9S.png', 
        url: '#',
        icon: <FaHeart className="partner-icon" style={{ color: '#FF4081' }} />,
        bgColor: '#FFF5F7'
      },
      { 
        name: 'Otaku Network', 
        logo: 'https://i.imgur.com/5XwW7bB.png', 
        url: '#',
        icon: <FaGamepad className="partner-icon" style={{ color: '#3D5AFE' }} />,
        bgColor: '#F5F7FF'
      },
      { 
        name: 'Manga United', 
        logo: 'https://i.imgur.com/8zN3vQq.png', 
        url: '#',
        icon: <FaBookOpen className="partner-icon" style={{ color: '#00C853' }} />,
        bgColor: '#F1F8E9'
      },
    ],
    food: [
      { 
        name: 'Ramen Ichiraku', 
        logo: 'https://i.imgur.com/Lp0GQYt.png', 
        url: '#',
        icon: <FaUtensils className="partner-icon" style={{ color: '#FF6D00' }} />,
        bgColor: '#FFF3E0'
      },
      { 
        name: 'Pocky Paradise', 
        logo: 'https://i.imgur.com/9Qm3KjZ.png', 
        url: '#',
        icon: <FaUtensils className="partner-icon" style={{ color: '#D500F9' }} />,
        bgColor: '#FCE4EC'
      },
    ],
    knowledge: [
      { 
        name: 'Anime University', 
        logo: 'https://i.imgur.com/4V6nDfY.png', 
        url: '#',
        icon: <FaGraduationCap className="partner-icon" style={{ color: '#2962FF' }} />,
        bgColor: '#E3F2FD'
      },
      { 
        name: 'Studio Ghibli', 
        logo: 'https://i.imgur.com/hW0Xk9U.png', 
        url: '#',
        icon: <FaStar className="partner-icon" style={{ color: '#FFD600' }} />,
        bgColor: '#FFFDE7'
      },
      { 
        name: 'Shonen Academy', 
        logo: 'https://i.imgur.com/2KvZ1xO.png', 
        url: '#',
        icon: <FaBookOpen className="partner-icon" style={{ color: '#00BFA5' }} />,
        bgColor: '#E0F7FA'
      },
    ],
    merchandise: [
      { 
        name: 'Akihabara Shop', 
        logo: 'https://i.imgur.com/mT3QvC8.png', 
        url: '#',
        icon: <FaTshirt className="partner-icon" style={{ color: '#AA00FF' }} />,
        bgColor: '#F3E5F5'
      },
      { 
        name: 'Neko Neko', 
        logo: 'https://i.imgur.com/VgLQqHh.png', 
        url: '#',
        icon: <FaTshirt className="partner-icon" style={{ color: '#FF1744' }} />,
        bgColor: '#FFEBEE'
      },
    ]
  };

  useEffect(() => {
    anime({
      targets: '.partners-title',
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.partners-intro',
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 600,
      delay: 300,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.partner-category',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.partner-logo',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(100, {grid: [5, 3], from: 'center'}),
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.partner-icon-container',
      scale: [0, 1],
      rotate: [-180, 0],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'spring(1, 80, 10, 0)'
    });
  }, []);

  const renderPartners = (category) => (
    <div className="partner-category">
      <h3 className="category-title">{category} Partners</h3>
      <div className="logos-grid">
        {partnersData[category.toLowerCase()].map((partner, index) => (
          <a 
            href={partner.url} 
            key={index} 
            className="partner-logo" 
            style={{ backgroundColor: partner.bgColor }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="partner-icon-container">
              {partner.icon}
            </div>
            <img src={partner.logo} alt={partner.name} />
            <div className="shine-effect"></div>
            <span className="partner-name">{partner.name}</span>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <Section id="partners" title="Our Partners" className="partners-section">
      <div className="partners-intro">
        <p>These awesome organizations are supporting our anime adventure!</p>
        <div className="anime-decoration">
          <span className="decoration-star">✧</span>
          <span className="decoration-star">✧</span>
          <span className="decoration-star">✧</span>
        </div>
      </div>

      <div className="partners-container">
        {renderPartners('Community')}
        {renderPartners('Food')}
        {renderPartners('Knowledge')}
        {renderPartners('Merchandise')}
      </div>
    </Section>
  );
};

export default Partners;