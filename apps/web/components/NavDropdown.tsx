"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/primitives';

interface NavDropdownProps {
  label: string;
  items?: { label: string; href?: string; id?: string; onClick?: () => void }[];
  className?: string;
  onClickLabel?: () => void;
}

/**
 * NavDropdown - Premium Linear Edition (Recalibrated)
 * Design: SF Pro, #b7c8ff Color Sync, Character Stretch
 * Vibe: Next-Level Web3 / Absolute Resonance
 */
export const NavDropdown: React.FC<NavDropdownProps> = ({ label, items = [], className, onClickLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn("relative h-full flex items-center group", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={onClickLabel}
        className="flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-500 hover:bg-white/[0.04]"
      >
        <span 
          className="font-medium group-hover:brightness-125 transition-all"
          style={{
            fontSize: "14px", 
            color: "#b7c8ff", 
            fontFamily: 'var(--font-questrial), sans-serif',
            letterSpacing: '0.05em',
            display: 'inline-block',
          }}
        >
          {label}
        </span>
        <span 
          className={cn(
            "text-[10px] transition-all duration-500",
            isOpen ? "rotate-[45deg] scale-125" : "rotate-0 scale-100"
          )}
          style={{ 
            color: "#b7c8ff",
            opacity: isOpen ? 1 : 0.4,
            fontFamily: 'serif',
            marginBottom: '-1px' 
          }}
        >
          🡮
        </span>
      </button>

      <AnimatePresence>
        {isOpen && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 min-w-[220px] p-2.5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-50"
          >
            <div className="absolute inset-0 bg-[#0a0a0a]/85 backdrop-blur-3xl border border-white/[0.08] rounded-2xl z-0" />
            
            <div 
              className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-soft-light z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dropdownNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dropdownNoise)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-20 flex flex-col gap-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={item.onClick}
                  className="group/item cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-all"
                >
                  <span 
                    className="text-[12px] font-medium tracking-[0.05em] text-white/60 group-hover/item:text-[#b7c8ff] transition-colors"
                    style={{ fontFamily: 'var(--font-questrial), sans-serif' }}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-white/0 group-hover/item:text-[#b7c8ff]/60 transition-all">🡮</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
