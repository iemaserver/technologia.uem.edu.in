import React, { useEffect, useRef } from 'react';
import Section from './Section';
import './Team.css';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { gsap } from 'gsap';

// Import local assets
import cardBackground from './assets/WEBSITE_CARD_BG.png';
import teamData from './data/teamdata.json';

// --- Import all photos and create a mapping ---
import photo1 from './assets/pfp/1.jpg';
import photo2 from './assets/pfp/2.jpg';
import photo3 from './assets/pfp/3.jpg';
import photo4 from './assets/pfp/4.jpg';
import photo5 from './assets/pfp/5.jpg';
import photo6 from './assets/pfp/6.jpg';
import photo7 from './assets/pfp/7.jpg';
import photo8 from './assets/pfp/8.jpg';
import photo9 from './assets/pfp/9.jpg';
import photo10 from './assets/pfp/10.jpg';
import photo11 from './assets/pfp/11.jpg';
import photo12 from './assets/pfp/12.jpg';
import photo13 from './assets/pfp/13.jpg';
import photo14 from './assets/pfp/14.jpg';
import photo15 from './assets/pfp/15.jpg';
import photo16 from './assets/pfp/16.jpg';
import photo17 from './assets/pfp/17.jpg';
import photo18 from './assets/pfp/18.jpg';
import photo19 from './assets/pfp/19.jpg';
import photo20 from './assets/pfp/20.jpg';
import photo21 from './assets/pfp/21.jpg';
import photo22 from './assets/pfp/22.jpg';
import photo23 from './assets/pfp/23.jpg';
import photo24 from './assets/pfp/24.jpg';
import photo25 from './assets/pfp/25.jpg';
import photo26 from './assets/pfp/26.jpg';
import photo27 from './assets/pfp/27.jpg';
import photo28 from './assets/pfp/28.jpg';
import photo29 from './assets/pfp/29.jpg';
import photo30 from './assets/pfp/30.jpg';
import photo31 from './assets/pfp/31.jpg';
import photo32 from './assets/pfp/32.jpg';
import photo33 from './assets/pfp/33.jpg';
import photo34 from './assets/pfp/34.jpg';
import photo35 from './assets/pfp/35.jpg';
import photo36 from './assets/pfp/36.jpg';
import photo37 from './assets/pfp/37.jpg';
import photo38 from './assets/pfp/38.jpg';
const photoMap = {
    './assets/pfp/1.jpg': photo1,
    './assets/pfp/2.jpg': photo2,
    './assets/pfp/3.jpg': photo3,
    './assets/pfp/4.jpg': photo4,
    './assets/pfp/5.jpg': photo5,
    './assets/pfp/6.jpg': photo6,
    './assets/pfp/7.jpg': photo7,
    './assets/pfp/8.jpg': photo8,
    './assets/pfp/9.jpg': photo9,
    './assets/pfp/10.jpg': photo10,
    './assets/pfp/11.jpg': photo11,
    './assets/pfp/12.jpg': photo12,
    './assets/pfp/13.jpg': photo13,
    './assets/pfp/14.jpg': photo14,
    './assets/pfp/15.jpg': photo15,
    './assets/pfp/16.jpg': photo16,
    './assets/pfp/17.jpg': photo17,
    './assets/pfp/18.jpg': photo18,
    './assets/pfp/19.jpg': photo19,
    './assets/pfp/20.jpg': photo20,
    './assets/pfp/21.jpg': photo21,
    './assets/pfp/22.jpg': photo22,
    './assets/pfp/23.jpg': photo23,
    './assets/pfp/24.jpg': photo24,
    './assets/pfp/25.jpg': photo25,
    './assets/pfp/26.jpg': photo26,
    './assets/pfp/27.jpg': photo27,
    './assets/pfp/28.jpg': photo28,
    './assets/pfp/29.jpg': photo29,
    './assets/pfp/30.jpg': photo30,
    './assets/pfp/31.jpg': photo31,
    './assets/pfp/32.jpg': photo32,
    './assets/pfp/33.jpg': photo33,
    './assets/pfp/34.jpg': photo34,
    './assets/pfp/35.jpg': photo35,
    './assets/pfp/36.jpg': photo36,
    './assets/pfp/37.jpg': photo37,
    './assets/pfp/38.jpg': photo38,
};

// --- Individual Card Component ---
const TeamMemberCard = ({ member }) => {
    const wrapperRef = useRef(null);
    const cardRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const card = cardRef.current;
        const background = backgroundRef.current;

        const handleMouseMove = (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -(y / rect.height) * 15;
            const rotateY = (x / rect.width) * 15;

            gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.4, ease: 'power3.out' });
            gsap.to(background, { x: -(x * 0.05), y: -(y * 0.05), duration: 0.4, ease: 'power3.out' });
        };

        const handleMouseLeave = () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power3.out' });
            gsap.to(background, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
        };

        wrapper.addEventListener('mousemove', handleMouseMove);
        wrapper.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            wrapper.removeEventListener('mousemove', handleMouseMove);
            wrapper.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // ** This is the fix: Look up the imported photo from the map **
    const photoSrc = photoMap[member.photo];

    return (
        <div className="card-wrapper" ref={wrapperRef}>
            <div className="team-card-new" ref={cardRef}>
                <div
                    className="card-background"
                    ref={backgroundRef}
                    style={{ backgroundImage: `url(${cardBackground})` }}
                ></div>
                <div className="card-border"></div>
                <div className="card-content-new">
                    <div className="top-text">
                        <p className="member-position-new">{member.position}</p>
                    </div>
                    <div className="photo-container-new">
                        <img src={photoSrc} alt={`${member.name}'s profile`} />
                    </div>
                    <div className="bottom-text">
                        <h3 className="member-name-new">{member.name}</h3>
                        <p className="member-name-japanese">{member.japaneseName}</p>
                    </div>
                    <div className="socials-new">
                        {member.socials.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        )}
                        {member.socials.instagram && (
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        )}
                        {member.socials.twitter && member.socials.twitter !== 'na' && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Team Component ---
const Guidance = () => {
    const groupedTeams = teamData.reduce((acc, member) => {
        let { position } = member;
        
        if (position.includes('Organizer')) {
            position = 'Organizing Team';
        } else if (position.includes('Graphics')) {
            position = 'Graphics Team';
        } else if (position.includes('Social Media')) {
            position = 'Social Media Team';
        }

        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push(member);
        return acc;
    }, {});

    const sectionOrder = [
        'Mentor',
        'Advisor'
    ];
    
    const orderedGroupedTeams = sectionOrder.reduce((acc, key) => {
        if (groupedTeams[key]) {
            acc[key] = groupedTeams[key];
        }
        return acc;
    }, {});

    return (
        <Section id="team" title="GUIDES">
            <div className="team-container">
                {Object.entries(orderedGroupedTeams).map(([position, members]) => (
                    <div className="team-section" key={position}>
                        <h2 className="team-position-title">{position}</h2>
                        <div className="team-row-wrapper">
    <div className="team-row">
        {members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
        ))}
    </div>
    <div className="scroll-blur left-blur"></div>
    <div className="scroll-blur right-blur"></div>
</div>

                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Guidance;