import React from 'react';
import './Section.css';

/**
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 */

const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="section-container">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;
