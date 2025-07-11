import React, { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastTouchTimeRef = useRef(0);

  useEffect(() => {
    // --- Mouse Event Handlers ---
    const onMouseMove = (e) => {

      if (Date.now() - lastTouchTimeRef.current < 500) {
        return;
      }
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnterBody = () => {
     
      if (Date.now() - lastTouchTimeRef.current < 500) {
        return;
      }
      setIsVisible(true);
    };

    const onMouseLeaveBody = () => {
      
      if (Date.now() - lastTouchTimeRef.current < 500) {
        return;
      }
      setIsVisible(false);
    };

    // --- Touch Event Handlers ---
    const onTouchStart = (e) => {
      lastTouchTimeRef.current = Date.now();
      setIsVisible(true);
      setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const onTouchMove = (e) => {
      lastTouchTimeRef.current = Date.now();
      setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const onTouchEndOrCancel = () => {
      lastTouchTimeRef.current = Date.now();
      setIsVisible(false);
    };

    // --- Handlers for interactive elements ---
    const onElementEnter = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.nav-menu-icon')) {
        setIsHovering(true);
      }
    };
    const onElementLeave = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.nav-menu-icon')) {
        setIsHovering(false);
      }
    };


    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseenter', onMouseEnterBody);
    document.body.addEventListener('mouseleave', onMouseLeaveBody);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEndOrCancel);
    document.addEventListener('touchcancel', onTouchEndOrCancel);
    document.addEventListener('mouseover', onElementEnter);
    document.addEventListener('mouseout', onElementLeave);


    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseenter', onMouseEnterBody);
      document.body.removeEventListener('mouseleave', onMouseLeaveBody);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEndOrCancel);
      document.removeEventListener('touchcancel', onTouchEndOrCancel);
      document.removeEventListener('mouseover', onElementEnter);
      document.removeEventListener('mouseout', onElementLeave);
    };
  }, []);

  const cursorClasses = `cursor ${isHovering ? 'hover' : ''} ${isVisible ? 'visible' : ''}`;
  const dotClasses = `dot ${isHovering ? 'hover' : ''} ${isVisible ? 'visible' : ''}`;

  return (
    <>
      <div
        className={cursorClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={dotClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;