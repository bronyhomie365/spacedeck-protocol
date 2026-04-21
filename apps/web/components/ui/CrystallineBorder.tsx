"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface CrystallineBorderProps {
  className?: string;
  borderRadius?: string;
  duration?: number;
  delay?: number;
}

export const CrystallineBorder: React.FC<CrystallineBorderProps> = ({ 
  borderRadius = "24px", 
  duration = 10,
  delay = 0 
}) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-30"
      style={{
        borderRadius,
        border: "1.5px solid transparent",
        background: "linear-gradient(145deg, rgba(255, 255, 255, 0.3) 0%, rgba(100, 200, 255, 0.15) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(150, 100, 255, 0.15) 75%, rgba(255, 255, 255, 0.3) 100%) border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        animation: `liquid-border-pulse ${duration}s ease-in-out infinite ${delay}s`,
      }}
    />
  );
};
