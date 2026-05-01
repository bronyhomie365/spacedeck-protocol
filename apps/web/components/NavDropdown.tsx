"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/primitives';

interface NavDropdownProps {
  label: string;
  tagline?: string;
  items?: { label: string; href?: string; id?: string; onClick?: () => void }[];
  className?: string;
  onClickLabel?: () => void;
}

/**
 * NavDropdown - Mega-Manifold Edition
 * Design: Full-Width Badge, Tagline Wing, Institutional Alignment
 */
export const NavDropdown: React.FC<NavDropdownProps> = ({ label, tagline, items = [], className, onClickLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn("h-full flex items-center group", className)}
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
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[112px] left-6 right-6 rounded-[32px] overflow-hidden z-50 border border-white/10"
            style={{ originY: 0 }}
          >
            {/* EXACT MATCH NAVBAR SUBSTRATE: 1:1 Color & Blur */}
            <div className="absolute inset-0 bg-[#6d6c6d]/40 backdrop-blur-[40px] backdrop-saturate-[180%] z-0" />
            
            {/* MATCHING GRAIN LAYER */}
            <div 
              className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sharpNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sharpNoise)'/%3E%3C/svg%3E")`,
                filter: 'contrast(1.5) brightness(0.9)',
              }}
            />

            {/* SEAMLESS TOP SEAL (Visual connection to navbar) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20" />

            <div className="relative z-30 flex px-20 py-14 gap-20">
              {/* LEFT WING: TAGLINE (High-Density) */}
              <div className="w-[42%] flex flex-col justify-center pr-12 border-r border-white/5">
                <h3 
                  className="text-white text-[22px] leading-tight font-medium"
                  style={{ fontFamily: 'var(--font-questrial), sans-serif', letterSpacing: '-0.01em' }}
                >
                  {tagline}
                </h3>
                <div className="mt-6 w-16 h-[2px] bg-[#b7c8ff]/40 rounded-full" />
              </div>

              {/* RIGHT WING: ITEMS (2-Column Institutional Grid) */}
              <div className="w-[58%] grid grid-cols-2 gap-3 items-center">
                {items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="group/item flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300"
                  >
                    <span 
                      className="text-[14px] font-medium tracking-[0.03em] text-white/70 group-hover/item:text-[#b7c8ff] transition-colors"
                      style={{ fontFamily: 'var(--font-questrial), sans-serif' }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[12px] opacity-0 group-hover/item:opacity-60 transition-all translate-x-[-4px] group-hover/item:translate-x-0">🡭</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BOTTOM GLOSS */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
