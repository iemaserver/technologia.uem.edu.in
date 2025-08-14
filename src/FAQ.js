import React, { useState } from 'react';
import Section from './Section';
import faqData from './data/faqData.json';
import './FAQ.css';

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <Section id="faq" title="FAQ">
      <div className="faq-container">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span>{faq.question}</span>
              <div className="faq-icon"></div>
            </div>
            <div className="faq-answer">
              <div className="faq-answer-content">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FAQ;