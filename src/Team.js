import React, { useEffect, useRef } from 'react';
import Section from './Section';
import './Team.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { gsap } from 'gsap';

const teamMembers = [
  {
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Member',
    name: 'Ranasurya Ghosh',
    position: 'Co-Lead Organiser',
    socials: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Member',
    name: 'Rajeet Ash',
    position: 'Lead Organizer',
    socials: {
      linkedin: 'https://www.linkedin.com/in/rajeet-ash',
      twitter: 'https://x.com/RajeetAsh',
      github: 'https://github.com/rajeet-04',
    },
  },
  {
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Member',
    name: 'Ananta Pathak',
    position: 'Co-Lead Organiser',
    socials: { linkedin: '#', github: '#' },
  },
];

const Team = () => {
  const teamGridRef = useRef(null);

  useEffect(() => {
    const cards = teamGridRef.current.children;
    
    // UPDATED: Changed from .from() to .to() for a more reliable entrance animation
    gsap.to(cards, {
      duration: 0.8,
      opacity: 1,
      y: 0, // Animate to default y position
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Add 3D tilt hover effect to each card
    Array.from(cards).forEach((card) => {
      const photo = card.querySelector('.team-photo-container');
      const name = card.querySelector('.member-name');
      const position = card.querySelector('.member-position');

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.4,
          boxShadow: '0px 20px 40px rgba(0, 170, 255, 0.3)',
          borderColor: 'rgba(0, 170, 255, 0.8)',
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.6,
          boxShadow: '0 0 25px rgba(0, 170, 255, 0)',
          borderColor: 'rgba(233, 69, 96, 0.2)',
          ease: 'power2.out',
        });
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power2.out' });
        gsap.to([photo, name, position], { transform: 'translateZ(0px)', duration: 0.6, ease: 'power2.out' });
      });

      card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        
        const rotateX = -(y / height) * 20;
        const rotateY = (x / width) * 20;

        gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.6, ease: 'power2.out' });
        gsap.to([photo, name, position], { transform: 'translateZ(40px)', duration: 0.6, ease: 'power2.out' });
      });
    });
  }, []);

  return (
    <Section id="team" title="Our Team">
      <div className="team-grid" ref={teamGridRef}>
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="team-photo-container">
              <img src={member.photo} alt={member.name} className="team-photo" />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-position">{member.position}</p>
            <div className="social-links">
              {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
              {member.socials.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>}
              {member.socials.github && <a href={member.socials.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;
