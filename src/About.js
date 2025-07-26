import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css'; // We will create this new CSS file

const About = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const finalLineRef = useRef(null);
  const updatingSoonRef = useRef(null);

  useEffect(() => {
    const loreElements = [
      titleRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      finalLineRef.current,
    ];

    // Set initial states
    gsap.set(loreElements, { autoAlpha: 0, y: 20 });
    gsap.set(updatingSoonRef.current, { autoAlpha: 0 });
    gsap.set(containerRef.current, { autoAlpha: 1 });

    // Animation sequence for the lore
    const tl = gsap.timeline({
      onComplete: () => {
        // --- Second phase of the animation ---
        const outroTl = gsap.timeline();
        outroTl
          .to(contentRef.current, { // Fade out all the lore content
            autoAlpha: 0,
            duration: 1.5,
            ease: 'power2.inOut'
          }, "+=1")
          .to(containerRef.current, { // Fade out the black background
            backgroundColor: 'transparent',
            duration: 2,
            ease: 'power2.inOut'
          }, "-=1")
          .to(updatingSoonRef.current, { // Fade in the "Updating Soon" text
            autoAlpha: 1,
            duration: 1.5
          }, "-=0.5");
      }
    });

    tl
      .to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, "+=0.5")
      .to(line1Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, "-=0.5")
      .to(line2Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, "+=0.5")
      .to(line3Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, "+=0.5")
      .to(finalLineRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, "+=1");

  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <div className="about-content" ref={contentRef}>
        <h2 className="about-title" ref={titleRef}>The Lore of Technologiaaa</h2>
        <p className="about-line" ref={line1Ref}>
          In an age where technology is the ultimate magic, Technologiaaa is the grand tournament where legends are born.
        </p>
        <p className="about-line" ref={line2Ref}>
          We summon coders, designers, and visionaries to an 8-hour challenge.
        </p>
        <p className="about-line" ref={line3Ref}>
          Your quest: to harness the power of modern tech and build something extraordinary. This isn't just a hackathon; it's a saga waiting for its heroes.
        </p>
        <p className="about-line final-line" ref={finalLineRef}>
          Will you answer the call?
        </p>
      </div>
      <div className="updating-soon-container" ref={updatingSoonRef}>
        <h3 className="updating-soon-text">Updating Soon</h3>
      </div>
    </div>
  );
};

export default About;
