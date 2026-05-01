"use client";
import React from 'react';
import { motion } from 'framer-motion';

// [ATOMIC SWARM]: Granular Disintegration Illusion — ported 1:1 from the_glass_ship

export const AtomicSwarm = ({ active }: { active: boolean }) => {
  if (!active) return null;

  const particles = Array.from({ length: 250 }).map((_, i) => {
    const angle = (i * 137.5) * (Math.PI / 180); // golden angle distribution
    const velocity = 150 + ((i * 93) % 800);
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    const size = (i % 4) + 1.5;
    const delay = ((i * 17) % 40) * 0.01;
    const isBlue = i % 5 === 0;
    return { id: i, tx, ty, size, delay, isBlue };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.isBlue
              ? 'bg-[#4fd1c5] shadow-[0_0_15px_rgba(79,209,197,1)]'
              : 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)]'
          }`}
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0 }}
          transition={{
            duration: 1.2 + ((p.id % 5) * 0.2),
            delay: p.delay,
            ease: [0.1, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
};
