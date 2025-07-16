import React from 'react';
import Section from './Section';
import './Timeline.css';

const timelineData = [
  { date: 'Phase 1: The Gathering', title: 'Registration Opens', description: 'The call goes out across the networks. Assemble your guild and sign the pact to join the fray.' },
  { date: 'Phase 2: The Awakening', title: 'Opening Ceremony', description: 'Ancient wisdom is shared by the High Council (our keynote speakers) as the tournament officially begins.' },
  { date: 'Phase 3: The Crucible', title: 'Hacking Begins', description: 'For 8 hours, the digital ether crackles with power as you bend code to your will.' },
  { date: 'Phase 4: The Offering', title: 'Project Submissions', description: 'Present your creations to the judges. The deadline is absolute; no extensions will be granted by the timekeepers.' },
  { date: 'Phase 5: The Judgment', title: 'Judging Period', description: 'The Council deliberates, weighing the power, creativity, and execution of each artifact.' },
  { date: 'Phase 6: The Ascension', title: 'Winners Announced', description: 'New legends are crowned, and victors claim their spoils and eternal glory.' },
];

const Timeline = () => {
  return (
    <Section id="timeline" title="The Grand Quest: Schedule">
      <div className="timeline-wrapper">
        <div className="timeline-container">
          {timelineData.map((event, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-content">
                <span className="event-date">{event.date}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Timeline;
