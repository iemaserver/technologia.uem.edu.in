import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasContainer = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / document.body.scrollHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, document.body.scrollHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';

    canvasContainer.appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < 1500; i++) {
      positions.push((Math.random() - 0.5) * 20);
      positions.push((Math.random() - 0.5) * 100); // taller vertical range
      positions.push((Math.random() - 0.5) * 20);
    }

    particles.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02
    });

    const pointCloud = new THREE.Points(particles, material);
    scene.add(pointCloud);

    const animate = () => {
      requestAnimationFrame(animate);
      pointCloud.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, document.body.scrollHeight);
      camera.aspect = window.innerWidth / document.body.scrollHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasContainer.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={canvasRef} className="three-background-global" />;
};

export default ThreeBackground;
