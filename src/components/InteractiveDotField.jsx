import React, { useRef, useEffect } from 'react';
import './InteractiveDotField.css';

/**
 * InteractiveDotField Component
 * Living particle field of Brand HEAT micro-dots.
 * - Gap reduced to 10px tight grid spacing.
 * - Full flush coverage to the bottom edge and right edge (0px gap).
 * - Increased opacity for punchy, crisp dots.
 * - Interactive spring repulsion when cursor moves over.
 */
export default function InteractiveDotField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let particles = [];

    // Mouse tracking
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particle grid with zero edge gaps
    const initGrid = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles = [];
      const gap = 10; // Tighter 10px grid spacing matching Brand HEAT dots
      // Cover full width and height with zero gaps at right and bottom
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;

      for (let r = 0; r < rows; r++) {
        // Align rows from the bottom up so the lowest row sits flush at the bottom edge
        const originY = height - (rows - 1 - r) * gap;
        for (let c = 0; c < cols; c++) {
          const originX = c * gap;
          particles.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            heat: 0,
            mass: 0.65 + Math.random() * 0.7, // Varied particle inertia - breaks circular alignment
            phase: Math.random() * Math.PI * 2, // Per-particle organic wobble
          });
        }
      }
    };

    initGrid();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initGrid, 150);
    };
    window.addEventListener('resize', handleResize);

    // Physics & render loop
    let time = 0;

    const render = () => {
      time += 0.024;

      let mouseVx = 0;
      let mouseVy = 0;
      let mouseSpeed = 0;

      // Smooth mouse interpolation & speed estimation
      if (mouse.active) {
        const nextX = mouse.x + (mouse.targetX - mouse.x) * 0.35;
        const nextY = mouse.y + (mouse.targetY - mouse.y) * 0.35;
        mouseVx = nextX - mouse.x;
        mouseVy = nextY - mouse.y;
        mouseSpeed = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);
        mouse.x = nextX;
        mouse.y = nextY;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      ctx.clearRect(0, 0, width, height);

      const restingParticles = [];
      const excitedParticles = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic repulsion physics: no circular boundary, living turbulent displacement
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0.1) {
            const angle = Math.atan2(dy, dx);

            // Multi-frequency harmonic perturbation: breaks geometric circle into organic fluid contour
            const wave =
              Math.sin(angle * 3 + time * 2.2 + p.phase) * 0.28 +
              Math.cos(angle * 5 - time * 1.8) * 0.16;

            // Velocity wake: stretches organically in direction of motion
            let velocityStretch = 0;
            if (mouseSpeed > 0.8) {
              const dotProduct = (dx * mouseVx + dy * mouseVy) / (dist * mouseSpeed);
              velocityStretch = -dotProduct * Math.min(0.35, mouseSpeed * 0.015);
            }

            // Organic, non-uniform radius per particle
            const baseRadius = 130 * p.mass;
            const organicRadius = baseRadius * (1 + wave + velocityStretch);

            if (dist < organicRadius) {
              const normDist = dist / organicRadius;
              // Smooth non-linear decay - prevents hard bunching rims
              const force = Math.pow(1 - normDist, 1.7) * (6.8 / p.mass);

              // Fluid swirl turbulence
              const curlAngle = angle + Math.sin(dist * 0.04 - time * 2.2) * 0.38;

              p.vx += Math.cos(curlAngle) * force;
              p.vy += Math.sin(curlAngle) * force;
              p.heat = Math.min(1, p.heat + 0.22 * (1 - normDist));
            }
          }
        }

        // Spring force returning to origin (Hooke's law)
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.14;
        p.vy += homeDy * 0.14;

        // Friction / damping
        p.vx *= 0.76;
        p.vy *= 0.76;

        p.x += p.vx;
        p.y += p.vy;

        // Cool down heat
        p.heat *= 0.91;

        if (p.heat > 0.08) {
          excitedParticles.push(p);
        } else {
          restingParticles.push(p);
        }
      }

      // Draw resting white particles with 10% opacity
      if (restingParticles.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < restingParticles.length; i++) {
          const p = restingParticles[i];
          ctx.moveTo(p.x + 1.25, p.y);
          ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
        ctx.fill();
      }

      // Draw excited warm orange particles (#FF6637) with subtle heat response
      if (excitedParticles.length > 0) {
        for (let i = 0; i < excitedParticles.length; i++) {
          const p = excitedParticles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 102, 55, ${0.15 + p.heat * 0.35})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="interactive-dot-field-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="interactive-dot-field-canvas" />
    </div>
  );
}
