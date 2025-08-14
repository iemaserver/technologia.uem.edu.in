import React, { useEffect, useRef } from 'react';
import './TechnologiaHeading.css';

const TechnologiaHeading = () => {
    const headingRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (headingRef.current) {
                const rect = headingRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;

                // --- CORRECTED LOGIC FOR Y-AXIS ONLY MOVEMENT ---
                const centerX = rect.width / 2;
                const maxRotation = 25; // Maximum rotation in degrees

                // 1. Calculate the mouse position relative to the center (-1 to 1).
                const percent = (x - centerX) / centerX;
                
                // 2. Calculate the angle based on the percentage and max rotation.
                const angleY = percent * maxRotation;
                // ----------------------------------------------------

                // Apply the transform with rotateX locked to 0.
                headingRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${angleY}deg)`;

                if (glowRef.current) {
                    const y = e.clientY - rect.top;
                    glowRef.current.style.left = `${x}px`;
                    glowRef.current.style.top = `${y}px`;
                }
            }
        };

        const handleMouseLeave = () => {
            if (headingRef.current) {
                // Reset the transform to its resting state.
                headingRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        };

        const headingElement = headingRef.current;
        if (headingElement) {
            headingElement.addEventListener('mousemove', handleMouseMove);
            headingElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (headingElement) {
                headingElement.removeEventListener('mousemove', handleMouseMove);
                headingElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className="technologia-heading-container">
            <div className="glow-effect" ref={glowRef}></div>
            <div className="heading-wrapper" ref={headingRef}>
                <h1 className="technologia-title">
                    <span className="title-tech">Tech</span>
                    <span className="title-logia">nologia</span>
                    <span className="title-version">1.0</span>
                </h1>
                <div className="neon-text-glow"></div>
                <div className="neon-text-glow neon-glow-2"></div>
                <div className="neon-text-glow neon-glow-3"></div>
            </div>
            <div className="particle-container">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        '--delay': `${Math.random() * 3}s`,
                        '--duration': `${2 + Math.random() * 2}s`,
                        '--x': `${Math.random() * 100}%`,
                        '--y': `${Math.random() * 100}%`
                    }}></div>
                ))}
            </div>
        </div>
    );
};

export default TechnologiaHeading;