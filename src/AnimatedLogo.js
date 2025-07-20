import React, { useState, useEffect, useRef } from 'react';
import './AnimatedLogo.css';

// Helper to import all images from a directory and sort them numerically
function importAll(r) {
  const customSort = (a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0], 10);
    const numB = parseInt(b.match(/(\d+)/)[0], 10);
    return numA - numB;
  };
  return r.keys().sort(customSort).map(r);
}

// Import the image sequence using the correct file name pattern
const logoFrames = importAll(require.context('./assets/logo', false, /Sequence_\d+\.png$/));

const FRAME_RATE = 1000 / 60; // Target 24fps

const AnimatedLogo = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationFrameId = useRef(null);
  const lastFrameTime = useRef(performance.now());

  useEffect(() => {
    if (logoFrames.length === 0) {
      console.warn("Animated logo frames not found. Check the path and naming pattern.");
      return;
    }

    // Animation loop using requestAnimationFrame for performance
    const animate = (now) => {
      if (now - lastFrameTime.current > FRAME_RATE) {
        lastFrameTime.current = now;
        setCurrentFrame((prevFrame) => (prevFrame + 1) % logoFrames.length);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function to stop the animation
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="animated-logo-container">
      {logoFrames.length > 0 && (
        <img src={logoFrames[currentFrame]} alt="Animated Logo" />
      )}
    </div>
  );
};

export default AnimatedLogo;
