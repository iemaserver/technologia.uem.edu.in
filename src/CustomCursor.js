import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

// --- Preload cursor frames as Image elements ---
function importAll(r) {
  const customSort = (a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0], 10);
    const numB = parseInt(b.match(/(\d+)/)[0], 10);
    return numA - numB;
  };

  return r.keys().sort(customSort).map((key) => {
    const img = new Image();
    img.src = r(key);
    return img;
  });
}

const cursorFrames = importAll(require.context('./assets/cursor', false, /Sequence \d+\.png$/));
// UPDATED: Slowed down the frame rate for a smoother effect
const FRAME_RATE = 1000 / 24; // Target 24fps

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const lastTouchTimeRef = useRef(0);
  const animationFrameId = useRef(null);
  const frameIndexRef = useRef(0);
  const lastFrameTime = useRef(performance.now());

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // --- Position and transform via GSAP ---
  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: -53,
      yPercent: -89,
      rotation: 30,
      transformOrigin: '50% 100%',
    });

    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.05, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.05, ease: 'power2.out' });

    const onMouseMove = (e) => {
      if (Date.now() - lastTouchTimeRef.current < 500) return;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  // --- Scale on hover ---
  useEffect(() => {
    gsap.to(cursorRef.current, {
      scale: isHovering ? 1.3 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isHovering]);

  // --- Visibility ---
  useEffect(() => {
    gsap.to(cursorRef.current, {
      autoAlpha: isVisible ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isVisible]);

  // --- Draw to canvas ---
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || cursorFrames.length === 0) return;

    const draw = (now) => {
      if (now - lastFrameTime.current > FRAME_RATE) {
        lastFrameTime.current = now;
        const frame = cursorFrames[frameIndexRef.current];
        
        // Ensure the image is loaded before drawing
        if (frame.complete) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(frame, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        frameIndexRef.current = (frameIndexRef.current + 1) % cursorFrames.length;
      }
      animationFrameId.current = requestAnimationFrame(draw);
    };

    if (isVisible) {
      animationFrameId.current = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isVisible]);

  // --- Events ---
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
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.nav-menu-icon')
      ) {
        setIsHovering(true);
      }
    };
    const onElementLeave = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.nav-menu-icon')
      ) {
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
      <canvas
        ref={canvasRef}
        className="cursor-canvas"
        // The canvas resolution should be high for quality
        width={512}
        height={512}
      />
    </div>
  );
};

export default CustomCursor;
