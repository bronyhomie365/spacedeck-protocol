"use client";
import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const KineticTransition: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const spawnParticle = useCallback((w: number, h: number): Particle => {
    return {
      x: Math.random() * w,
      y: h * 0.6 + Math.random() * h * 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.3 + Math.random() * 0.8),
      size: 1 + Math.random() * 2,
      opacity: 0,
      life: 0,
      maxLife: 120 + Math.random() * 180,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < 80; i++) {
      const p = spawnParticle(rect.width, rect.height);
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const MAX_PARTICLES = 120;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      if (particlesRef.current.length < MAX_PARTICLES && Math.random() > 0.6) {
        particlesRef.current.push(spawnParticle(w, h));
      }

      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = (progress / 0.2) * 0.6;
        } else if (progress > 0.7) {
          p.opacity = ((1 - progress) / 0.3) * 0.6;
        } else {
          p.opacity = 0.6;
        }

        p.vx += (Math.random() - 0.5) * 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(183, 200, 255, ${p.opacity})`;
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(183, 200, 255, ${p.opacity * 0.08})`;
          ctx.fill();
        }

        return p.life < p.maxLife;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [spawnParticle]);

  return (
    <div className="relative w-full h-[200px] -mt-[100px] z-[5] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #020617 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
};
