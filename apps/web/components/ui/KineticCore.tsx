"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Share2, Repeat, Layers } from 'lucide-react';

interface EngineToggleProps {
  label: string;
  active: boolean;
  icon: React.ElementType;
}

// [SHARD]: Sub-atomic toggle with Translucent Glass & Gradient Border
const EngineToggle: React.FC<EngineToggleProps> = ({ label, active, icon: Icon }) => (
  <div className="flex items-center justify-between w-full group">
    <div className="flex items-center gap-2.5">
      {/* Icon Container with Exclusion Mask for Transparent Blending */}
      <div 
        className={`relative p-1.5 rounded-[10px] transition-all duration-700 ${
          active ? 'opacity-100' : 'opacity-40'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* The Ethereal Edge: Gradient Border without Opaque Background */}
        <div 
          className="absolute inset-0 rounded-[10px] p-[0.5px] pointer-events-none"
          style={{
            background: active 
              ? 'linear-gradient(135deg, #FFFFFF 0%, #b7c8ff 100%)' 
              : 'rgba(255, 255, 255, 0.1)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }} 
        />

        <Icon 
          size={13} 
          strokeWidth={active ? 2.2 : 1.5} 
          stroke={active ? "url(#cloudy-pop-gradient)" : "white"}
          className="relative z-10 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] transition-all duration-700"
        />
      </div>

      <span className={`text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-700 ${
        active ? 'text-white/90' : 'text-white/15'
      }`} style={active ? { textShadow: "0 0 6px rgba(183,200,255,0.3)" } : {}}>
        {label}
      </span>
    </div>    {/* Agentic Switch: Ethereal Realignment */}
    <div 
      className={`w-8 h-4 rounded-full relative transition-all duration-700 ${
        active ? 'opacity-100' : 'opacity-40'
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Switch Track Edge: Translucent Gradient Border */}
      <div 
        className="absolute inset-0 rounded-full p-[0.5px] pointer-events-none"
        style={{
          background: active 
            ? 'linear-gradient(135deg, #FFFFFF 0%, #b7c8ff 100%)' 
            : 'rgba(255, 255, 255, 0.1)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }} 
      />

      <motion.div 
        initial={false}
        animate={{ x: active ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: active ? 'url(#cloudy-pop-gradient)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: active 
            ? '0 0 15px rgba(183, 200, 255, 0.6), inset 0 0 4px rgba(255, 255, 255, 0.5)' 
            : 'none',
          backgroundColor: active ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Sub-atomic cloudy core pop */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white via-[#b7c8ff] to-[#93a8d8] ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} />
        
        {/* Premium glint layer */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-white/60 to-transparent ${active ? 'opacity-100' : 'opacity-0'}`} />
      </motion.div>
    </div>
  </div>
);

export const KineticCore = ({ payload }: { payload: any }) => {
  const appleStack = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif";

  // Sequential Boot Sequence: Intelligence Visualization
  const [mevActive, setMevActive] = React.useState(false);
  const [anonActive, setAnonActive] = React.useState(false);
  const [swapActive, setSwapActive] = React.useState(false);
  const [multiplexActive, setMultiplexActive] = React.useState(false);

  React.useEffect(() => {
    const timer1 = setTimeout(() => setMevActive(payload.engine_mev_shield), 600);
    const timer2 = setTimeout(() => setAnonActive(payload.engine_anon_routing), 1000);
    const timer3 = setTimeout(() => setSwapActive(payload.engine_swap_active), 1400);
    const timer4 = setTimeout(() => setMultiplexActive(payload.engine_multiplex_staking), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [payload]);

  return (
    <div 
      className="relative h-full w-full flex flex-col items-center justify-center px-4 py-2"
      style={{ fontFamily: appleStack }}
    >
      {/* SVG Asset Definition: The Static Cloudy Pop Gradient */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="cloudy-pop-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#b7c8ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glass Housing: Ethereal Layering */}      
      <div className="absolute inset-y-0 w-full bg-gradient-to-b from-white/[0.01] via-[#b7c8ff]/[0.03] to-white/[0.01] border-x-[0.5px] border-[#b7c8ff]/5 rounded-[20px]" />
      
      {/* Toggles Column */}
      <div className="relative z-10 w-full flex flex-col gap-4 px-1">
        <div className="text-[#b7c8ff]/40 text-[7px] font-bold tracking-[0.4em] uppercase text-center mb-1 border-b border-[#b7c8ff]/10 pb-2" style={{ fontFamily: "var(--font-questrial), sans-serif" }}>
          ROUTING DEFAULTS & SECURITY
        </div>
        
        <EngineToggle 
          label="MEV Shielding" 
          active={mevActive} 
          icon={ShieldCheck} 
        />
        <EngineToggle 
          label="Anon Routing" 
          active={anonActive} 
          icon={Share2} 
        />
        <EngineToggle 
          label="Auto Swap" 
          active={swapActive} 
          icon={Repeat} 
        />
        <EngineToggle 
          label="Multiplexing" 
          active={multiplexActive} 
          icon={Layers} 
        />
      </div>

      {/* Decorative Energy Pulse: Phased Blue */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-[#b7c8ff]/20 blur-md animate-pulse" />
    </div>
  );
};
