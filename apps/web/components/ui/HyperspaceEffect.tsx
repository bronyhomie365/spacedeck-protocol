"use client";
import React, { useRef, useEffect } from 'react';

interface HyperspaceEffectProps {
  color?: string;
  count?: number;
  speed?: number;
}

export const HyperspaceEffect: React.FC<HyperspaceEffectProps> = ({
  color = "#4fd1c5",
  count = 120,
  speed = 1.2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const updateSize = (w: number, h: number) => {
      width = w;
      height = h;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        updateSize(w, h);
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      observer.observe(parent);
      updateSize(parent.clientWidth, parent.clientHeight);
    }

    class Streak {
      x: number;
      y: number;
      z: number;
      pz: number;
      velocity: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.velocity = Math.random() * speed + 0.5;
        this.x = (Math.random() - 0.5) * 2000; // Larger world space
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 1000;
        this.pz = this.z;
      }

      update() {
        this.pz = this.z;
        this.z -= this.velocity * 15;
        if (this.z <= 10) {
          this.z = 1000;
          this.pz = 1000;
        }
      }

      draw() {
        const scale = 400; // Normalized focal length
        const sx = (this.x / this.z) * scale + width / 2;
        const sy = (this.y / this.z) * scale + height / 2;
        
        const px = (this.x / this.pz) * scale + width / 2;
        const py = (this.y / this.pz) * scale + height / 2;

        const opacity = Math.min(1, (1000 - this.z) / 800) * (this.z / 1000);
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity * 0.7;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }

    const streaks = Array.from({ length: count }, () => new Streak());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
      gradient.addColorStop(0, 'rgba(79, 209, 197, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      streaks.forEach(streak => {
        streak.update();
        streak.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
    />
  );
};
