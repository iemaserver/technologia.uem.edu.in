import React, { useState } from 'react';
import Section from './Section';
import './Team.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const teamMembers = [
  {
    name: "Ranasurya Ghosh",
    role: "Cursed Role: Domain Architect",
    technique: "Cursed Technique: Full-Stack Conjuring",
    expansion: "Domain Expansion: Turquoise Glitch Nexus",
    auraColor: "#8E44AD",
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: "Rajeet Ash",
    role: "Cursed Role: Lead Sorcerer",
    technique: "Cursed Technique: Glitch Manipulation",
    expansion: "Domain Expansion: Infinite Deployment Shrine",
    auraColor: "#1ABC9C",
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
    auraColor: "#E74C3C",
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
];

const TeamCard = ({ member }) => {
  const [flipped, setFlipped] = useState(false);
  const imgName = member.name.toLowerCase().replace(/ /g, '-');

  // The useEffect for auto-unflip is no longer needed with hover

  return (
    <div
      className={`team-card-jjk ${flipped ? 'flipped' : ''}`}
      style={{ '--aura-color': member.auraColor }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="card-inner">
        {/* Front Face */}
        <div className="card-front">
          <div className="cursed-aura"></div>
          <div className="cursed-sigils">呪</div>
          <img
            className="member-photo"
            src={`/images/${imgName}.jpg`}
            alt={member.name}
          />
          <h3 className="member-name-front">{member.name}</h3>
        </div>

        {/* Back Face */}
        <div className="card-back">
          <div className="cursed-aura"></div>
          <div className="cursed-sigils">術</div>
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
            <div className="social-links-jjk">
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaLinkedin />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaXTwitter />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => (
  <Section id="team" title="The Sorcerers">
    <div className="team-grid-jjk">
      {teamMembers.map((member, idx) => (
        <TeamCard key={idx} member={member} />
      ))}
    </div>
  </Section>
);

export default Team;
