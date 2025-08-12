import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import './Timeline.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import the new timeline data
import timelineData from './data/timelineData.json';

gsap.registerPlugin(ScrollTrigger);

// --- Countdown Timer Component ---
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

  // Find the index of the current active phase
  const getCurrentPhaseIndex = () => {
    const now = new Date();
    for (let i = timelineData.length - 1; i >= 0; i--) {
      if (now >= new Date(timelineData[i].date)) {
        return i;
      }
    }
    return -1; // No phase has started yet
  };
  const currentPhaseIndex = getCurrentPhaseIndex();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from('.countdown-container', {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
          const isLast = index === timelineData.length - 1;
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                x: isLast ? 0 : (index % 2 === 0 ? -100 : 100),
        y: isLast ? 100 : 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }, timelineRef);
    return () => ctx.revert();
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
