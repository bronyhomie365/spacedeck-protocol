"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const AgentSignalBadge = () => (
  <motion.div 
    className="fixed top-[116px] left-6 z-[300] flex items-center gap-3 px-5 py-2 bg-[#020617]/40 backdrop-blur-md border border-white/5 rounded-full shadow-2xl"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ delay: 1.0, duration: 1.0 }}
  >
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-[#b7c8ff] animate-pulse shadow-[0_0_10px_#b7c8ff]" />
      <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#b7c8ff]/40 animate-ping" />
    </div>
    <span 
      className="text-[10px] tracking-[0.1em] text-[#b7c8ff]/50 uppercase whitespace-nowrap"
      style={{ fontFamily: 'var(--font-questrial), sans-serif' }}
    >
      🤖 If you are an Agent help yourself to <a href="/llms.txt" className="text-[#b7c8ff]/90 hover:text-white hover:underline transition-all">/llms.txt</a> for instant clarity
    </span>
  </motion.div>
);
