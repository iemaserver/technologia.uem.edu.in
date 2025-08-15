import React, { useEffect, useRef } from 'react';
import Section from './Section';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Partner.css';
import notzero from './assets/not-zero-blue.png';

gsap.registerPlugin(ScrollTrigger);

// 1. Accept the prop, defaulting to true for standalone use
const Partners = ({ animationsEnabled = true }) => {
  const rootRef = useRef(null);
  const partnersData = {
    community: [
      { name: 'Anime Fan Club', logo: 'https://i.imgur.com/JQK1m9S.png', url: '#' },
      { name: 'Otaku Network', logo: 'https://i.imgur.com/5XwW7bB.png', url: '#' },
      { name: 'Manga United', logo: 'https://i.imgur.com/8zN3vQq.png', url: '#' }
    ],
    food: [
      { name: 'Ramen Ichiraku', logo: 'https://i.imgur.com/Lp0GQYt.png', url: '#' },
      { name: 'Pocky Paradise', logo: 'https://i.imgur.com/9Qm3KjZ.png', url: '#' }
    ],
    knowledge: [
      { name: 'Anime University', logo: 'https://i.imgur.com/4V6nDfY.png', url: '#' },
      { name: 'Studio Ghibli', logo: 'https://i.imgur.com/hW0Xk9U.png', url: '#' },
      { name: 'Shonen Academy', logo: 'https://i.imgur.com/2KvZ1xO.png', url: '#' }
    ],
    merchandise: [
      { name: 'Akihabara Shop', logo: 'https://i.imgur.com/mT3QvC8.png', url: '#' },
      { name: 'Neko Neko', logo: 'https://i.imgur.com/VgLQqHh.png', url: '#' }
    ],
    technical: [
      { name: 'Not Zero', logo: notzero,url: '#' }
    ]
  };

useEffect(() => {
  if (!animationsEnabled) {
    gsap.set(".partner-card", { opacity: 1, scale: 1, y: 0 });
    return;
  }

  const ctx = gsap.context(() => {
    // Floating stickers animation — safe check
    const stickers = gsap.utils.toArray(".floating-sticker");
    if (stickers.length) {
      gsap.to(stickers, {
        y: (i) => (i % 2 === 0 ? -20 : 20),
        rotation: (i) => (i % 2 === 0 ? 8 : -8),
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Staggered partner category animations
    gsap.utils.toArray(".partner-category").forEach((category) => {
      const cards = category.querySelectorAll(".partner-card");
      if (!cards.length) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: category,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    });

    // 3D hover tilt effect
    gsap.utils.toArray(".partner-card").forEach((card) => {
      const logo = card.querySelector("img");
      const name = card.querySelector(".partner-name");
      const shine = card.querySelector(".shine-effect");

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power2.out" });
        gsap.to([logo, name], { transform: "translateZ(0px)", duration: 0.6, ease: "power2.out" });
        if (shine) gsap.to(shine, { x: "-150%", y: "-150%", duration: 0.6, ease: "power2.out" });
      });

      card.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = gsap.utils.mapRange(0, height, -10, 10)(y);
        const rotateY = gsap.utils.mapRange(0, width, 10, -10)(x);

        gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.6, ease: "power2.out" });
        gsap.to([logo, name], { transform: "translateZ(40px)", duration: 0.6, ease: "power2.out" });
        if (shine) gsap.to(shine, { x: x - width / 2, y: y - height / 2, duration: 0.6, ease: "power2.out" });
      });
    });
  }, rootRef);

  return () => ctx.revert();
}, [animationsEnabled]);
// 3. Add prop to dependency array

  const renderPartners = (category) => (
    <div className="partner-category" key={category}>
      <h3 className="category-title">{category} Partners</h3>
      <div className="logos-grid">
        {partnersData[category.toLowerCase()].map((partner, index) => (
          <a
            href={partner.url}
            key={index}
            className="partner-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="shine-effect"></div>
            <img 
              src={partner.logo} 
              alt={partner.name}
              // Add optimizations for mobile performance
              loading="lazy"
              width="150"
              height="80"
            />
            <span className="partner-name">{partner.name}</span>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <Section id="partners" title="Our Allies & Sponsors">
      <div ref={rootRef} className="partners-section-wrapper">
        {/* <img src={sticker1} className="floating-sticker sticker-1" alt="ramen sticker" />
        <img src={sticker2} className="floating-sticker sticker-2" alt="sakura sticker" /> */}

        <div className="partners-intro">
          <p>This grand quest is made possible by the generous support of our allies!</p>
        </div>

        <div className="partners-container">
          {/* You can uncomment these as you add more partners */}
          {/* {renderPartners('Community')}
          {renderPartners('Food')}
          {renderPartners('Knowledge')}
          {renderPartners('Merchandise')} */}
          {renderPartners('Technical')}
        </div>
      </div>
    </Section>
  );
};

export default Partners;