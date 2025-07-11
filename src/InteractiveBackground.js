import React, { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Mouse position with fixed, squared radii for efficient distance checking
    const mouse = {
      x: null,
      y: null,
      // The squared radius to "capture" particles (e.g., radius of ~141px)
      captureRadiusSq: 20000,
      // A larger squared radius to "release" particles (e.g., radius of ~200px)
      releaseRadiusSq: 40000, 
    };

    const mouseMoveHandler = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', mouseMoveHandler);

    // Particle class with a new property to track its state
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.isCaptured = false; // To track if it's "stuck" to the cursor
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Create particle array
    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#e0e0e0';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }
    
    // FIXED: This function now correctly implements the "sticky" web logic
    function connect() {
      // If mouse is off-screen, release all captured particles
      if (mouse.x === undefined || mouse.y === undefined) {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].isCaptured = false;
        }
        return;
      }
      
      // Loop through all particles to update their state and draw lines
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        // Calculate the squared distance for performance
        const distanceToMouseSq = ((particle.x - mouse.x) * (particle.x - mouse.x)) +
                                  ((particle.y - mouse.y) * (particle.y - mouse.y));
        
        // Capture logic: If particle is close enough, capture it.
        if (distanceToMouseSq < mouse.captureRadiusSq) {
            particle.isCaptured = true;
        } 
        // Release logic: If a captured particle moves too far away, release it.
        else if (particle.isCaptured && distanceToMouseSq > mouse.releaseRadiusSq) {
            particle.isCaptured = false;
        }

        // Drawing logic: If the particle is captured, draw a line to it.
        if (particle.isCaptured) {
            const opacityValue = 1 - (distanceToMouseSq / mouse.releaseRadiusSq);
            ctx.strokeStyle = `rgba(233, 69, 96, ${opacityValue < 0 ? 0 : opacityValue})`; // Theme color for the web
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
        }
      }
    }

    // Resize event handler
    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Radii are fixed, so no need to recalculate them here
      init();
    };
    window.addEventListener('resize', resizeHandler);

    // Mouse out event handler
    const mouseOutHandler = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };
    window.addEventListener('mouseout', mouseOutHandler);

    init();
    animate();

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mouseout', mouseOutHandler);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: '#1a1a2e' }} />;
};

export default InteractiveBackground;
