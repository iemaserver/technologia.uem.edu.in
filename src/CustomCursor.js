import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

function importAll(r) {
  const customSort = (a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0], 10);
    const numB = parseInt(b.match(/(\d+)/)[0], 10);
    return numA - numB;
  };
  return r.keys().sort(customSort).map(r);
}

const cursorFrames = importAll(require.context('./assets/cursor', false, /Sequence \d+\.png$/));
const FRAME_RATE = 1000 / 24;

const CustomCursor = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);
  const lastTouchTimeRef = useRef(0);
  const animationFrameId = useRef(null);
  const lastFrameTime = useRef(performance.now());

  useEffect(() => {
    gsap.set(cursorRef.current, {
      // UPDATED: Corrected the percentage offsets
      xPercent: -55,  // Center horizontally
      yPercent: -85, // Align bottom tip to cursor
      rotation: 30,
      transformOrigin: "50% 100%",
    });

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.05, ease: "power2.out" });

    const onMouseMove = (e) => {
      if (Date.now() - lastTouchTimeRef.current < 500) return;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    gsap.to(cursorRef.current, {
      scale: isHovering ? 1.3 : 1,
      xTo: -40,
      yTo: -70,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isHovering]);

  useEffect(() => {
    gsap.to(cursorRef.current, {
      autoAlpha: isVisible ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isVisible]);

  useEffect(() => {
    if (cursorFrames.length === 0) return;
    const animate = (now) => {
      if (now - lastFrameTime.current > FRAME_RATE) {
        lastFrameTime.current = now;
        setCurrentFrame((prevFrame) => (prevFrame + 1) % cursorFrames.length);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (isVisible) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isVisible]);

  useEffect(() => {
    const onMouseEnterBody = () => {
      if (Date.now() - lastTouchTimeRef.current < 500) return;
      setIsVisible(true);
    };
    const onMouseLeaveBody = () => {
      if (Date.now() - lastTouchTimeRef.current < 500) return;
      setIsVisible(false);
    };
    const onTouchStart = (e) => {
      lastTouchTimeRef.current = Date.now();
      setIsVisible(true);
      gsap.to(cursorRef.current, { x: e.touches[0].clientX, y: e.touches[0].clientY, duration: 0 });
    };
    const onTouchMove = (e) => {
      lastTouchTimeRef.current = Date.now();
      gsap.to(cursorRef.current, { x: e.touches[0].clientX, y: e.touches[0].clientY, duration: 0 });
    };
    const onTouchEndOrCancel = () => {
      lastTouchTimeRef.current = Date.now();
      setIsVisible(false);
    };
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

    document.body.addEventListener('mouseenter', onMouseEnterBody);
    document.body.addEventListener('mouseleave', onMouseLeaveBody);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEndOrCancel);
    document.addEventListener('touchcancel', onTouchEndOrCancel);
    document.addEventListener('mouseover', onElementEnter);
    document.addEventListener('mouseout', onElementLeave);

    return () => {
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

  return (
    <div ref={cursorRef} className="image-cursor">
      {cursorFrames.length > 0 && (
        <img src={cursorFrames[currentFrame]} alt="Cursor Animation" />
      )}
    </div>
  );
};

export default CustomCursor;
