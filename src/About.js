import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css';

const About = () => {
  // Refs for each new content block
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const challengeRef = useRef(null);
  const processRef = useRef(null);
  const legacyRef = useRef(null);
  const sloganRef = useRef(null);

  useEffect(() => {
    // Array of all elements to be animated
    const animatedElements = [
      titleRef.current,
      introRef.current,
      challengeRef.current,
      processRef.current,
      legacyRef.current,
      sloganRef.current,
    ];

    // Set initial state: invisible, slightly blurred, and moved down
    gsap.set(animatedElements, { autoAlpha: 0, y: 30, filter: 'blur(8px)' });

    // Create the animation timeline
    const tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power3.out',
      },
    });

    // Stagger the animation of each element
    tl.to(titleRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, '+=0.5')
      .to(introRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, '-=1')
      .to(challengeRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, '-=1')
      .to(processRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, '-=1')
      .to(legacyRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, '-=1')
      .to(sloganRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 2 }, '+=0.5');

  }, []);

  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title" ref={titleRef}>The Technologia Saga</h2>
        <p className="about-line" ref={introRef}>
          In the year where innovation decides the fate of industries, a new battleground emerges, TECHNOLOGIA. An 8-hour open-innovation hackathon hosted by the University of Engineering and Management (UEM), Kolkata, where visionaries, coders, designers, and dreamers gather to forge solutions that could change the future.
        </p>
        <p className="about-line" ref={challengeRef}>
          Here, there is no single path. No fixed theme. Only a blank canvas waiting for bold creators to script their own quests; whether in AI & ML, Blockchain & Web3, AR/VR, MedTech, Web/App Development, or so many more challenges unimagined.
        </p>
        <p className="about-line" ref={processRef}>
          In these 8 relentless hours, teams will ideate, prototype, and battle the clock, turning sparks of inspiration into working solutions that stand the test of both time and scrutiny.
        </p>
        <p className="about-line" ref={legacyRef}>
          Rooted in the innovation-friendly ecosystem of UEM, a campus located in the heart of New Town, Kolkata, and surrounded by industry giants, Technologia blends academic brilliance with real-world exposure. With strong placement records and global collaborations, it fosters an environment where ideas don’t just stay on paper—they become reality.
        </p>
        <p className="about-slogan" ref={sloganRef}>
          "The code you write today may be the legend told tomorrow."
        </p>
      </div>
    </div>
  );
};

export default About;