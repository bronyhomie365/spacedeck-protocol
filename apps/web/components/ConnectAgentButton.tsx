"use client";
import React from 'react';
import { cn } from './ui/primitives';
import { useKineticStore } from '../store/useKineticStore';

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
  const isUnlocked = useKineticStore((state) => state.isUnlocked);
  const setUnlocked = useKineticStore((state) => state.setUnlocked);

  const handleAction = () => {
    if (!isUnlocked) {
      setUnlocked(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handleAction}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full transition-all duration-300",
          "border border-[#b7c8ff]/40 bg-[#000000] hover:border-[#b7c8ff]/80 hover:shadow-[0_0_35px_rgba(183,200,255,0.4)]", 
          "overflow-hidden",
          className
        )}
        style={{
          width: '194px',
          height: '44px',
          boxShadow: '0 0 25px rgba(183,200,255,0.25), inset 0 0 12px rgba(183,200,255,0.1)', 
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
          {isUnlocked ? "Authorize Agent" : "Explore the Space"}
        </span>
      </button>
    </div>
  );
};
