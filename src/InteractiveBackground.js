import React, { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const lastTouchTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const mouse = {
      x: null,
      y: null,
      captureRadiusSq: 20000,
      releaseRadiusSq: 40000,
    };

    // --- Event Handlers ---
    const mouseMoveHandler = (event) => {

      if (Date.now() - lastTouchTimeRef.current < 500) {
        return;
      }
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const touchStartHandler = (event) => {
      lastTouchTimeRef.current = Date.now();
      mouse.x = event.touches[0].clientX;
      mouse.y = event.touches[0].clientY;
    };

    const touchMoveHandler = (event) => {
      lastTouchTimeRef.current = Date.now();
      mouse.x = event.touches[0].clientX;
      mouse.y = event.touches[0].clientY;
    };

    const mouseOrTouchEndHandler = () => {
      lastTouchTimeRef.current = Date.now();
      mouse.x = undefined;
      mouse.y = undefined;
    };

    // Add event listeners
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseout', mouseOrTouchEndHandler);
    window.addEventListener('touchstart', touchStartHandler, { passive: true });
    window.addEventListener('touchmove', touchMoveHandler, { passive: true });
    window.addEventListener('touchend', mouseOrTouchEndHandler);
    window.addEventListener('touchcancel', mouseOrTouchEndHandler);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.isCaptured = false;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * (window.innerWidth - size * 2) - size * 2) + size * 2;
        let y = (Math.random() * (window.innerHeight - size * 2) - size * 2) + size * 2;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#e0e0e0'));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    function connect() {
      if (mouse.x === undefined || mouse.y === undefined) {
        for (let i = 0; i < particlesArray.length; i++) {
          if (particlesArray[i].isCaptured) particlesArray[i].isCaptured = false;
        }
        return;
      }

      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        const distanceToMouseSq =
          (particle.x - mouse.x) * (particle.x - mouse.x) +
          (particle.y - mouse.y) * (particle.y - mouse.y);

        if (distanceToMouseSq < mouse.captureRadiusSq) {
          particle.isCaptured = true;
        } else if (particle.isCaptured && distanceToMouseSq > mouse.releaseRadiusSq) {
          particle.isCaptured = false;
        }

        if (particle.isCaptured) {
          const opacityValue = 1 - distanceToMouseSq / mouse.releaseRadiusSq;
          ctx.strokeStyle = `rgba(233, 69, 96, ${opacityValue < 0 ? 0 : opacityValue})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      }
    }

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', resizeHandler);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseout', mouseOrTouchEndHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('touchend', mouseOrTouchEndHandler);
      window.removeEventListener('touchcancel', mouseOrTouchEndHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: '#1a1a2e' }} />;
};

export default InteractiveBackground;
