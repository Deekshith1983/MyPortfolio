'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // --- Particle Geometry ---
    const PARTICLE_COUNT = 800;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);  // sine-wave phase offsets

    const colorPalette = [
      new THREE.Color('#ff8c42'), // warm orange
      new THREE.Color('#ffb347'), // amber
      new THREE.Color('#ffffff'), // white
      new THREE.Color('#ffd700'), // gold
      new THREE.Color('#ff6b35'), // deep orange
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles across a wide volume
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 6 + 2;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Soft circle texture for bokeh look
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 64;
    circleCanvas.height = 64;
    const ctx = circleCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(circleCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      map: texture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Mouse Parallax ---
    const mouse = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animId: number;
    let startTime = performance.now();
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const basePositions = [...positions]; // keep original Y values

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      // Sine-wave Y oscillation per particle
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseY = basePositions[i * 3 + 1];
        posAttr.array[i * 3 + 1] = baseY + Math.sin(t * 0.4 + phases[i]) * 0.3;
        // Slow horizontal drift
        const baseX = basePositions[i * 3 + 0];
        posAttr.array[i * 3 + 0] = baseX + Math.cos(t * 0.2 + phases[i] * 0.5) * 0.15;
      }
      posAttr.needsUpdate = true;

      // Smooth camera parallax
      targetCam.x += (mouse.x * 0.6 - targetCam.x) * 0.03;
      targetCam.y += (mouse.y * 0.4 - targetCam.y) * 0.03;
      camera.position.x = targetCam.x;
      camera.position.y = targetCam.y;
      camera.lookAt(scene.position);

      // Slow global rotation for cinematic depth
      particles.rotation.y = t * 0.01;
      particles.rotation.x = Math.sin(t * 0.05) * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
