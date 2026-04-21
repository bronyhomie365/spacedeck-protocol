"use client";
import React from 'react';
import { cn } from './ui/primitives';

interface ConnectAgentButtonProps {
  onClick?: () => void;
  className?: string;
}

/**
 * ConnectAgentButton - The Neural Gateway
 * Design: Absolute Black (#000000) Pill with Bold Light Steel Blue Font and High-Density Centered Halo
 * Vibe: Recalibrated for absolute geometric centering and high-density brim cling.
 */
export const ConnectAgentButton: React.FC<ConnectAgentButtonProps> = ({ onClick, className }) => {
  return (
    <div className="relative group flex items-center justify-center h-[44px] w-[194px]">
      {/* HIGH-DENSITY CENTERED HALO (STATIC) */}
      <div 
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          // Geometric Centering: Fixed size slightly larger than the button
          width: '198px',
          height: '48px',
          backgroundColor: '#b7c8ff',
          opacity: 0.95,
          // Tight density: Low blur, minimal spread
          filter: 'blur(6px)',
          boxShadow: '0 0 4px 1px rgba(183, 200, 255, 0.9)',
        }}
      />
      
      <button
        onClick={onClick}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full transition-all duration-300",
          "bg-[#000000] border border-black", 
          "overflow-hidden",
          className
        )}
        style={{
          width: '194px',
          height: '44px',
          // Centered shadow to prevent occlusion of the bottom glow
          boxShadow: '0 0 32px rgba(0, 0, 0, 1)', 
          transform: 'none',
        }}
      >
        {/* LABEL: MICROGRAMMA FONT HARMONY - BOLD RESONANCE */}
        <span 
          className="relative z-20 uppercase pointer-events-none leading-none tracking-[0.1em]"
          style={{
            fontSize: "10px",
            color: "#b7c8ff",
            fontWeight: 900,
            fontFamily: "var(--font-microgramma), sans-serif",
          }}
        >
          Connect Agent
        </span>
      </button>
    </div>
  );
};
