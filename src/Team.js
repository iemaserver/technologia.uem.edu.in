import React, { useEffect, useRef } from 'react';
import Section from './Section';
import './Team.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { gsap } from 'gsap';

// New data structure inspired by the "Cursed Technique Scroll" theme
const teamMembers = [
  {
    name: "Ranasurya Ghosh",
    role: "Cursed Role: Domain Architect",
    technique: "Cursed Technique: Full-Stack Conjuring",
    expansion: "Domain Expansion: Infinite Deployment Shrine",
    auraColor: "#8E44AD", // Violet for AI/ML
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: "Rajeet Ash",
    role: "Cursed Role: Lead Sorcerer",
    technique: "Cursed Technique: Glitch Manipulation",
    expansion: "Domain Expansion: Turquoise Glitch Nexus",
    auraColor: "#1ABC9C", // Turquoise for Web
    socials: {
      linkedin: 'https://www.linkedin.com/in/rajeet-ash',
      twitter: 'https://x.com/RajeetAsh',
      github: 'https://github.com/rajeet-04',
    },
  },
  {
    name: "Ananta Pathak",
    role: "Cursed Role: Shikigami Tactician",
    technique: "Cursed Technique: Algorithmic Beast Taming",
    expansion: "Domain Expansion: Chimera Swarm Protocol",
    auraColor: "#E74C3C", // Crimson for Robotics/Logic
    socials: { linkedin: '#', github: '#' },
  },
];

const Team = () => {
  const teamGridRef = useRef(null);

  useEffect(() => {
    const cards = teamGridRef.current.children;

    // Staggered entrance animation
    gsap.fromTo(cards, 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

    // Add hover animations to each card
    Array.from(cards).forEach((card) => {
      const aura = card.querySelector('.cursed-aura');
      const sigils = card.querySelector('.cursed-sigils');

      const hoverTimeline = gsap.timeline({ paused: true });
      hoverTimeline
        .to(aura, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
        .to(sigils, { opacity: 0.1, duration: 0.4, ease: 'power2.out' }, "-=0.4");

      card.addEventListener('mouseenter', () => hoverTimeline.play());
      card.addEventListener('mouseleave', () => hoverTimeline.reverse());
    });
  }, []);

  return (
    <Section id="team" title="The Sorcerers">
      <div className="team-grid-jjk" ref={teamGridRef}>
        {teamMembers.map((member, index) => (
          <div className="team-card-jjk" key={index} style={{ '--aura-color': member.auraColor }}>
            {/* Background Aura and Sigils */}
            <div className="cursed-aura"></div>
            <div className="cursed-sigils">呪</div>

            {/* Card Content */}
            <div className="card-header">
              <span className="top-seal">呪術高専</span>
            </div>
            <div className="card-body">
              <h3 className="member-name-jjk">{member.name}</h3>
              <p className="member-role-jjk">{member.role}</p>
              
              <div className="technique-divider"></div>

              <div className="technique-info">
                <p className="technique-title">Innate Technique</p>
                <p className="technique-name">{member.technique}</p>
              </div>
              <div className="technique-info">
                <p className="technique-title">Domain Expansion</p>
                <p className="technique-name expansion">{member.expansion}</p>
              </div>
            </div>
            <div className="card-footer">
              <div className="social-links-jjk">
                {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                {member.socials.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>}
                {member.socials.github && <a href={member.socials.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;
