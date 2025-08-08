import React, { useEffect } from 'react';
import Section from './Section';
import './Team.css';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { gsap } from 'gsap';
import logo from './assets/logo.png';
import cardBackground from './assets/WEBSITE_CARD_BG.png';

const teamMembers = [
  
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
  {
    name: 'Rajeet Ash',
    japaneseName: 'ラジート・アッシュ',
    position: 'Lead Sorcerer',
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Rajeet',
    socials: {
      linkedin: 'https://www.linkedin.com/in/rajeet-ash',
      twitter: 'https://www.x.com/RajeetAsh',
      instagram: 'https://www.instagram.com/r_a_j_e_e_t_',
    },
  },
  {
    name: 'Ranasurya Ghosh',
    japaneseName: 'ラナスリヤーヤ・ゴッショ',
    position: 'Shikigami Tactician',
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Ranasurya',
    socials: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    name: 'Jarjis Alam',
    japaneseName: 'ジャージス・アラム',
    position: 'Lead Designer',
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Jarjis',
    socials: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    name: "Ayushman Achariya",
    japaneseName: "アユッシマン・アチリヤ",
    position: "Lead Designer",
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Ananta',
    socials: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  }
];

const Team = () => {
  useEffect(() => {
    const wrappers = document.querySelectorAll('.card-wrapper');

    wrappers.forEach((wrapper) => {
      const card = wrapper.querySelector('.team-card-new');
      const background = card.querySelector('.card-background');

      const handleMouseMove = (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 15;
        const rotateY = (x / rect.width) * 15;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.4,
          ease: 'power3.out',
        });

        gsap.to(background, {
          x: -(x * 0.05),
          y: -(y * 0.05),
          duration: 0.4,
          ease: 'power3.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power3.out',
        });

        gsap.to(background, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      };

      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      wrapper._onMove = handleMouseMove;
      wrapper._onLeave = handleMouseLeave;
    });

    return () => {
      const wrappers = document.querySelectorAll('.card-wrapper');
      wrappers.forEach((wrapper) => {
        wrapper.removeEventListener('mousemove', wrapper._onMove);
        wrapper.removeEventListener('mouseleave', wrapper._onLeave);
      });
    };
  }, []);

  return (
    <Section id="team" title="The Sorcerers">
      <div className="team-grid-new">
        {teamMembers.map((member, index) => (
          <div className="card-wrapper" key={index}>
            <div className="team-card-new">
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
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;
