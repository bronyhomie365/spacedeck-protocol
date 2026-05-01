"use client";
// Ambient floating teal particles — 1:1 match to the_glass_ship crystal bubbles
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BottomHyperflareProps {
  count?: number;
}

export const BottomHyperflare = ({ count = 38 }: BottomHyperflareProps) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      // Scatter fully across width, weighted toward bottom 80% of the strip
      x: Math.random() * 100,           // % of container width
      y: Math.random() * 100,           // % of container height
      size: Math.random() * 3 + 1.5,    // 1.5–4.5px
      isTeal: Math.random() > 0.4,      // ~60% teal, 40% white
      duration: Math.random() * 8 + 10, // 10–18s float cycle
      delay: -(Math.random() * 12),     // pre-offset so it's alive on load
      driftX: (Math.random() - 0.5) * 30, // ±15px horizontal drift
      driftY: -(Math.random() * 40 + 20), // 20–60px upward drift
    })),
  [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.isTeal ? '#4fd1c5' : '#ffffff',
            boxShadow: p.isTeal
              ? `0 0 ${p.size * 3}px rgba(79,209,197,0.9), 0 0 ${p.size * 6}px rgba(79,209,197,0.4)`
              : `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`,
          }}
          animate={{
            x: [0, p.driftX, p.driftX * 0.5, 0],
            y: [0, p.driftY, p.driftY * 1.3, 0],
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.8, 1.1, 0.9, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
