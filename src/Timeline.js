import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import './Timeline.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timelineData from './data/timelineData.json';

gsap.registerPlugin(ScrollTrigger);

// --- Countdown Timer Component (No Changes Needed) ---
const Countdown = ({ targetDate }) => {
  // ... your existing Countdown component code ...
  // This component does not need any changes.
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
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
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
const Timeline = () => {
  const timelineRef = useRef(null);

  const getCurrentPhaseIndex = () => {
    const now = new Date();
    for (let i = timelineData.length - 1; i >= 0; i--) {
      if (now >= new Date(timelineData[i].date)) {
        return i;
      }
    }
    return -1;
  };
  const currentPhaseIndex = getCurrentPhaseIndex();
  
  useEffect(() => {
    // A slight delay to ensure the page layout is fully calculated
    const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
            gsap.from('.countdown-container', {
                opacity: 0,
                y: -50,
                duration: 1,
                ease: 'power3.out',
                // We can add a ScrollTrigger here too if we want
                scrollTrigger: {
                    trigger: '.countdown-container',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                }
            });

            // --- UNIFIED SCROLLTRIGGER FOR ALL ITEMS ---
            gsap.utils.toArray('.timeline-item').forEach((item, index) => {
                const isLast = index === timelineData.length - 1;
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        // Trigger when the top of the item is 150px from the bottom of the screen
                        start: 'top bottom-=150px',
                        toggleActions: 'play none none none',
                        // Animation will only play once and not repeat on scroll up/down
                        once: true, 
                    },
                    opacity: 0,
                    // Stagger the direction of the animation
                    x: isLast ? 0 : (index % 2 === 0 ? -100 : 100),
                    y: isLast ? 100 : 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        }, timelineRef);

        return () => {
            ctx.revert();
            // Ensure all ScrollTriggers are killed on cleanup
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, []);

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