import React from 'react';
import Section from './Section';
import './Timeline.css'; 

const timelineData = [
  {
    date: 'August 1, 2025',
    title: 'Registration Opens',
    description: 'The portal opens for all aspiring participants to register for the hackathon.',
  },
  {
    date: 'August 15, 2025',
    title: 'Opening Ceremony',
    description: 'Kick-off event with keynote speakers and the official start of the hackathon.',
  },
  {
    date: 'August 15, 2025',
    title: 'Hacking Begins',
    description: '8 hours of intense coding, designing, and building begins now!',
  },
  {
    date: 'August 16, 2025',
    title: 'Project Submissions',
    description: 'Final deadline for all teams to submit their projects for judging.',
  },
  {
    date: 'August 17, 2025',
    title: 'Judging Period',
    description: 'Our expert panel of judges will review all submitted projects.',
  },
  {
    date: 'August 18, 2025',
    title: 'Closing Ceremony & Winners Announcement',
    description: 'Announcement of the winning teams and distribution of prizes.',
  },
];

const Timeline = () => {
  return (
    <Section id="timeline" title="Event Timeline">
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
