import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

// Types
interface ResonanceGaugeProps {
  resonanceValue?: number;
  intentLabel?: string;
  inferenceLabel?: string;
  className?: string;
}

// Main Component: The glossy, dual-gradient resonance indicator aligned to SF Pro Blue stack
export const ResonanceGauge: React.FC<ResonanceGaugeProps> = ({
  resonanceValue = 94.2,
  intentLabel = "Human Intent",
  inferenceLabel = "Agent Inference",
  className = ""
}) => {
  const appleStack = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif";

  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ fontFamily: appleStack }}
    >
      {/* Compact bar with labels */}
      <div className="relative h-10 flex items-center">
        {/* Left label */}
        <div className="absolute left-0 top-0">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60A5FA]/60">
            {intentLabel}
          </span>
        </div>

        {/* Right label with status dot and tooltip */}
        <div className="absolute right-0 top-0 flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
            {inferenceLabel}
          </span>
          <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          
          {/* Information Tooltip */}
          <div className="group relative ml-1">
            <HelpCircle 
              size={11} 
              className="text-white/20 hover:text-white/60 cursor-help transition-colors" 
            />
            <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-[#0F172A] border-[0.5px] border-white/10 rounded-xl text-[10px] leading-relaxed text-[#60A5FA]/80 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-2xl backdrop-blur-xl">
              <div className="text-white font-bold mb-1 uppercase tracking-widest text-[9px]">Resonance Engine</div>
              This bar specifies strength of your intent that dictates agentic recommendation.
            </div>
          </div>
        </div>

        {/* Main progress bar: Pico Glass Instrument */}
        <div className="absolute left-0 right-0 top-5 h-1.5 rounded-full bg-black/60 overflow-visible shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          
          {/* Inner Depth Chamber (The Floor) */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),inset_0_-1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
            
            {/* Human Intent: Pressurized Luminous Core */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#FFFFFF] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${resonanceValue}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Internal Caustic Glint */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10 mix-blend-overlay" />
            </motion.div>
            
            {/* Agent Inference: Recessed Volume */}
            <motion.div
              className="absolute inset-y-0 right-0 bg-[#3B82F6]/10"
              initial={{ width: '100%' }}
              animate={{ width: `${100 - resonanceValue}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Pico Bevel: The 0.5mm Crystalline Edge */}
          <div 
            className="absolute inset-[-1px] rounded-full p-[0.5px] pointer-events-none z-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.7) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Top-Down Specular Shine (Surface Reflection) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent h-[40%] z-40 pointer-events-none" />
          
          {/* Indicator: Micro-Glint Needle */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-50"
            initial={{ left: 0 }}
            animate={{ left: `${resonanceValue}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* The Lens: Magnifying Glint */}
            <div className="w-2.5 h-2.5 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-white rounded-full blur-[2px] opacity-40 animate-pulse" />
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#FFFFFF] border-[0.5px] border-cyan-200 z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
