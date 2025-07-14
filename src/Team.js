import React from 'react';
import Section from './Section';
import './Team.css'; 
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Mock data for team members.
const teamMembers = [
  
  {
    photo: 'https://placehold.co/300x300/1a1a2e/e94560?text=Member',
    name: 'Ranasurya Ghosh',
    position: 'Co-Lead Organiser',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
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
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
];

const Team = () => {
  return (
    <Section id="team" title="Our Team">
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="team-photo-container">
              <img src={member.photo} alt={member.name} className="team-photo" />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-position">{member.position}</p>
            <div className="social-links">
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {member.socials.twitter && (
                <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;
