import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import './Timeline.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timelineData from './data/timelineData.json';

gsap.registerPlugin(ScrollTrigger);

// --- Countdown Component (No changes needed) ---
const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="countdown-container">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div className="countdown-box" key={unit}>
          <span className="countdown-number">{String(value).padStart(2, '0')}</span>
          <span className="countdown-label">{unit}</span>
        </div>
      ))}
    </div>
  );
};

// --- Main Timeline Component ---
const Timeline = ({ animationsEnabled = true }) => {
  const timelineRef = useRef(null);
  const getCurrentPhaseIndex = () => {
    const now = new Date();
    for (let i = timelineData.length - 1; i >= 0; i--) {
      if (now >= new Date(timelineData[i].date)) return i;
    }
    return -1;
  };
  const currentPhaseIndex = getCurrentPhaseIndex();
  
  useEffect(() => {
    if (!animationsEnabled) {
      gsap.set('.timeline-item, .countdown-container', { opacity: 1, y: 0, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // --- MOBILE ANIMATION: Animate all at once after a 3-second delay ---
        const tl = gsap.timeline({
          delay: 0, // Wait 3 seconds before starting
        });

        tl.from('.countdown-container', {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: 'power3.out',
        })
        .from('.timeline-item', {
          opacity: 0,
          y: 50, // Animate from bottom up
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2, // Animate each item 0.2s after the previous one
        }, "-=0.5"); // Overlap with the countdown animation for a smoother feel

      } else {
        // --- DESKTOP ANIMATION: Use ScrollTrigger as before ---
        const timer = setTimeout(() => {
          ScrollTrigger.refresh();

          gsap.from('.countdown-container', {
            opacity: 0, y: -50, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.countdown-container',
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          });

          gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            const isLast = index === timelineData.length - 1;
            const startTrigger = isLast ? 'top 95%' : 'top bottom-=100px';

            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: startTrigger,
                toggleActions: 'play none none none',
                once: true,
              },
              opacity: 0,
              x: isLast ? 0 : (index % 2 === 0 ? -100 : 100),
              y: isLast ? 100 : 0,
              duration: 0.8,
              ease: 'power2.out'
            });
          });
        }, 500);
        
        // Return a cleanup function for the timer
        return () => clearTimeout(timer);
      }
    }, timelineRef);

    // Main cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, [animationsEnabled]);

  return (
    <Section id="timeline" title="The Grand Quest">
      <div ref={timelineRef}>
        <h3 className="countdown-title">The Grand Convergence Begins In:</h3>
        <Countdown targetDate="2025-10-18T10:00:00" />
        <div className="timeline-wrapper">
          <div className="timeline-container">
            {timelineData.map((event, index) => (
              <div 
                className={`timeline-item ${index === currentPhaseIndex ? 'is-active' : ''}`} 
                key={index}
              >
                <div className="timeline-content">
                  <span className="event-date">{event.date}</span>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Timeline;