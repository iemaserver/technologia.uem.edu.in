import React, { useEffect, useRef } from 'react';
import Section from './Section';
import './Team.css';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { gsap } from 'gsap';
import logo from './assets/logo.png';
import cardBackground from './assets/WEBSITE_CARD_BG.png';

const teamMembers = [
  {
    name: 'Jarjis Alam',
    japaneseName: 'ジャージス・アラム',
    position: 'Lead Designer',
    photo: logo, // Use imported logo image
    socials: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    name: 'Rajeet Ash',
    japaneseName: 'ラジート・アッシュ',
    position: 'Lead Sorcerer',
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Rajeet',
    socials: {
      linkedin: 'https://www.linkedin.com/in/rajeet-ash',
      twitter: 'https://x.com/RajeetAsh',
      instagram: '#',
    },
  },
  {
    name: 'Ananta Pathak',
    japaneseName: 'アナンタ・パタク',
    position: 'Shikigami Tactician',
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Ananta',
    socials: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
];

const Team = () => {
  const teamGridRef = useRef(null);

  useEffect(() => {
    const cards = Array.from(teamGridRef.current.children);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      { duration: 0.8, opacity: 1, y: 0, stagger: 0.2, ease: 'power3.out' }
    );

    const handleMouseMove = (e, card, content) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const rotateX = -(y / height) * 10;
      const rotateY = (x / width) * 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to(content, {
        transform: 'translateZ(50px)',
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (card, content) => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to(content, {
        transform: 'translateZ(0px)',
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    cards.forEach((card) => {
      const content = card.querySelector('.card-content-new');
      const onMove = (e) => handleMouseMove(e, card, content);
      const onLeave = () => handleMouseLeave(card, content);

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      // Save listeners for cleanup
      card._onMove = onMove;
      card._onLeave = onLeave;
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', card._onMove);
        card.removeEventListener('mouseleave', card._onLeave);
      });
    };
  }, []);

  return (
    <Section id="team" title="The Sorcerers">
      <div className="team-grid-new" ref={teamGridRef}>
        {teamMembers.map((member, index) => (
          <div className="team-card-new" key={index}>
            <div
              className="card-background"
              style={{ backgroundImage: `url(${cardBackground})` }}
            ></div>
            <div className="card-border"></div>
            <div className="card-content-new">
              <div className="top-text">
                <p className="member-position-new">{member.position}</p>
                <span className="japanese-seal">がいそくみらりらきにちちち</span>
              </div>
              <div className="photo-container-new">
                <img src={member.photo} alt={member.name} />
              </div>
              <div className="bottom-text">
                <h3 className="member-name-new">{member.name}</h3>
                <p className="member-name-japanese">{member.japaneseName}</p>
              </div>
              <div className="socials-new">
                {member.socials.linkedin?.trim() && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.socials.instagram?.trim() && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.socials.twitter?.trim() && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;
