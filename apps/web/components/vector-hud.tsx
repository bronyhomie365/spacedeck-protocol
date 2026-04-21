"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VectorHud: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const [box, setBox] = useState<{top: number, left: number, width: number, height: number} | null>(null);
  const rafRef = useRef<number | null>(null);

  const getSafeClassName = (el: HTMLElement | Element): string => {
    if (!el) return '';
    const cls = el.className;
    if (typeof cls === 'object' && cls !== null && 'baseVal' in cls) {
      return String((cls as any).baseVal);
    }
    if (typeof cls === 'string') return cls;
    return '';
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ctrl + . activates/deactivates Vector Mode
      if (e.ctrlKey && e.key === '.') {      
        setIsActive(prev => !prev);
        setHoveredEl(null);
        setBox(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const updateBox = (target: HTMLElement) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    setBox({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
  };

  useEffect(() => {
    if (!isActive) {
      setBox(null);
      setHoveredEl(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (target.closest('#vector-hud-layer')) return;

      setHoveredEl(target);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => updateBox(target));
    };

    const handleScroll = () => {
      if (hoveredEl) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => updateBox(hoveredEl));
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!isActive || !hoveredEl) return;
      e.preventDefault();
      e.stopPropagation();

      const tagName = hoveredEl.tagName.toLowerCase();
      const text = hoveredEl.innerText?.substring(0, 50).replace(/\n/g, ' ') || "";
      const classes = getSafeClassName(hoveredEl);

      const prompt = `>frame Target: <${tagName} class="${classes}"> containing "${text}" -> [INSTRUCTION HERE]`;

      navigator.clipboard.writeText(prompt).then(() => {
        // Crystalline notification style
        alert("VECTOR LOCKED: Identity captured and copied to clipboard.\nPaste it in Gemini CLI to modify.");
      });

      setIsActive(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, hoveredEl]);

  return (
    <AnimatePresence>
      {isActive && (
        <div id="vector-hud-layer" className="fixed inset-0 pointer-events-none z-[9999]">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#2DD4BF] text-[#0F172A] px-6 py-2 rounded-full font-bold text-xs shadow-[0_0_20px_rgba(45,212,191,0.4)] pointer-events-auto flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F172A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F172A]"></span>
            </span>
            VECTOR MODE: SELECT ELEMENT (Ctrl + . to Exit)
          </motion.div>

          {box && (
            <motion.div
              initial={false}
              animate={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="fixed border-2 border-[#2DD4BF] bg-[#2DD4BF]/5 pointer-events-none z-[10000] shadow-[0_0_15px_rgba(45,212,191,0.2)]"
            >
              <div className="absolute -top-6 left-0 bg-[#2DD4BF] text-[#0F172A] text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest whitespace-nowrap">
                {hoveredEl?.tagName.toLowerCase()} • {getSafeClassName(hoveredEl!).split(' ')[0] || 'no-class'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#2DD4BF]" />
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#2DD4BF]" />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
