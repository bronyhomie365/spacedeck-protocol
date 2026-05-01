"use client";
import React from 'react';
import { cn } from './ui/primitives';
import Image from 'next/image';
import { useKineticStore } from '../store/useKineticStore';

interface SovereignNavbarProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * SovereignNavbar - Apple-Tier Glassmorphic Manifold
 * Design: Solid #5b6587 dust layer, Borderless, Shadowless, Centered Navigation
 * Vibe: High-end Minimalist / OS-level Component
 */
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SovereignNavbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const SovereignNavbar: React.FC<SovereignNavbarProps> = ({ children, className }) => {
  const setTruthShard = useKineticStore((state) => state.setTruthShard);
  const setSolverMode = useKineticStore((state) => state.setSolverMode);
  const setAgentMode = useKineticStore((state) => state.setAgentMode);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const menuData: Record<string, any> = {
    "Product": {
      tagline: "Zero-Custody Executing Broker",
      description: "Decoupling intelligence from execution. Keyless authorization, encrypted dark pool clearing, and atomic Jito settlement.",
      items: [
        { label: "Zero-Custody Architecture", desc: "Eliminating mempool exposure.", id: 'manifest-gravity' },
        { label: "Cryptographic Ingress", desc: "Keyless Near MPC authentication.", id: 'manifest-prism', shard: 'prism' },
        { label: "Clearing Enclave", desc: "Arcium-encrypted dark pool.", id: 'manifest-compliance', shard: 'permits' },
        { label: "Atomic Settlement", desc: "400ms Jito execution finality.", id: 'manifest-settlement' }
      ]
    },
    "Security": {
      tagline: "Institutional-Grade Capital Security",
      description: "Our dual-layer security model ensures that AI agents can command millions without ever touching a private key.",
      items: [
        { label: "PDA Budget Delegation", desc: "On-chain spending limits for agents.", shard: 'permits' },
        { label: "Keyless Near MPC", desc: "Threshold signatures for sovereign auth.", shard: 'mpc' },
        { label: "Institutional Audits", desc: "Verified deterministic invariants.", shard: 'audits' }
      ]
    },
    "Developers": {
      tagline: "The Deterministic Kinetic Pipeline",
      description: "Strictly decoupling algorithmic intelligence from cryptographic execution. From raw intent to atomic settlement.",
      items: [
        { label: "Universal Socket", desc: "Strictly typed JSON intent schemas.", isAgentDoc: true, anchorId: 'phase-1-anchor' },
        { label: "Capital Guard", desc: "CLI-driven PDA budget delegation.", isAgentDoc: true, anchorId: 'phase-1-anchor' },
        { label: "Python SDK", desc: "Institutional high-frequency integration.", isAgentDoc: true, anchorId: 'phase-2-anchor' },
        { label: "Eliza Plugin", desc: "Native execution for cognitive frameworks.", isAgentDoc: true, anchorId: 'phase-2-anchor' }
      ]
    }
  };

  const currentMenu = activeMenu ? menuData[activeMenu] : null;

  return (
    <motion.header 
      className={cn(
        "fixed top-6 left-6 right-6 z-[5000] flex flex-col overflow-hidden",
        "border border-white/5",
        // VOID ALIGNMENT: 35% Opacity Substrate (More see-through/Darker) + 40px Blur
        "bg-[#6d6c6d]/35 backdrop-blur-[40px] backdrop-saturate-[180%]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]",
        className
      )}
      initial={false}
      animate={{ 
        height: activeMenu ? 460 : 80,
        borderRadius: "40px" // Maintain original navbar edge curvature throughout expansion
      }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* MICRO-MIST GRAIN (ATOMIZED DNA) */}
      <div 
        className="absolute inset-0 opacity-[0.09] pointer-events-none mix-blend-soft-light z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dropdownNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dropdownNoise)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px', 
          backgroundRepeat: 'repeat',
          filter: 'blur(0.6px) contrast(1.1)', // Sands down sharp noise into smooth membrane
        }}
      />

      {/* TOP ROW: PERSISTENT NAV (OG BASELINE ALIGNMENT) */}
      <div className="h-20 shrink-0 flex items-center justify-between px-10 relative z-30">
        <style>{`
          .top-nav-axis {
            transform: translateY(2px);
          }
        `}</style>
        {/* LEFT WING: Identity */}
        <div className="top-nav-axis flex items-center min-w-[150px]">
          <Image src="/spacedeck7.png" alt="SPACEDECK" width={150} height={40} priority className="h-10 w-auto object-contain opacity-90 drop-shadow-[0_0_10px_rgba(183,200,255,0.2)]" />
        </div>

        {/* CENTER WING: Triggers */}
        <nav className="top-nav-axis absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          {["Product", "Security", "Developers"].map((cat) => (
            <button 
              key={cat}
              onMouseEnter={() => setActiveMenu(cat)}
              className="flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-500 hover:bg-white/[0.04] group"
            >
              <span className="font-medium text-[#b7c8ff] text-[14px] tracking-[0.05em] group-hover:brightness-125 transition-all" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>
                {cat}
              </span>
              <span className={cn("transition-all duration-500 text-white", activeMenu === cat ? "rotate-180 opacity-100" : "opacity-40")}>
                <ChevronDown size={14} />
              </span>
            </button>
          ))}
          <a href="https://docs.spacedeck.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-500 hover:bg-white/[0.04] group">
            <span className="font-medium text-[#b7c8ff] text-[14px] tracking-[0.05em] group-hover:brightness-125 transition-all" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>Docs</span>
            <span className="text-[10px] text-[#b7c8ff] opacity-40 group-hover:opacity-100 transition-all">🡭</span>
          </a>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-500 hover:bg-white/[0.04] group" onClick={() => setSolverMode(true)}>
            <span className="font-medium text-[#cdd8ff] text-[14px] tracking-[0.05em] group-hover:brightness-125 transition-all" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>Solver Portal</span>
          </button>
        </nav>

        {/* RIGHT WING: Command */}
        <div className="top-nav-axis flex items-center gap-6 min-w-[150px] justify-end">
          {children}
        </div>
      </div>

      {/* EXPANDED CONTENT: THE INTEGRATED MEGA-MANIFOLD */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1 px-16 py-12 relative z-30 border-t border-white/5 flex gap-20"
          >
            {/* LEFT: THE ANCHOR (Headline + Description) */}
            <div className="w-[40%] flex flex-col justify-center">
              <h2 className="text-white text-[32px] leading-[1.1] font-medium mb-6" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>
                {currentMenu.tagline}
              </h2>
              <p className="text-white/50 text-[16px] leading-relaxed mb-8 max-w-[340px]" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>
                {currentMenu.description}
              </p>
              <button 
                className="w-fit px-8 py-3 rounded-full bg-white text-black text-[12px] font-bold uppercase tracking-wider hover:bg-[#b7c8ff] transition-all"
                onClick={() => {
                  if (activeMenu === 'Developers') {
                    setAgentMode(true);
                    setSolverMode(false);
                    setTimeout(() => {
                      const el = document.getElementById('agent-instructions-container');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  } else {
                    setAgentMode(false);
                    setSolverMode(false);
                    setTimeout(() => {
                      const el = document.getElementById('science-manifest');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }
                  setActiveMenu(null);
                }}
              >
                See Overview
              </button>
            </div>

            {/* RIGHT: THE GRID (Action Items) */}
            <div className="w-[60%] grid grid-cols-2 gap-4 items-center">
              {currentMenu.items.map((item: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.isAgentDoc) {
                      setAgentMode(true);
                      setSolverMode(false);
                      if (item.anchorId) {
                        setTimeout(() => {
                          const el = document.getElementById(item.anchorId);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 150);
                      }
                    } else {
                      setAgentMode(false);
                      setSolverMode(false);
                      setTimeout(() => {
                        if (item.id) {
                          const el = document.getElementById(item.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        if (item.shard) setTruthShard(item.shard);
                      }, 150);
                    }
                    setActiveMenu(null);
                  }}
                  className="group/item flex flex-col items-start p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all text-left"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[15px] font-normal text-white group-hover/item:text-[#b7c8ff] transition-colors" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>
                      {item.label}
                    </span>
                    <span className="text-[12px] text-[#b7c8ff] opacity-0 group-hover/item:opacity-100 transition-all translate-x-[-4px] group-hover/item:translate-x-0">🡭</span>
                  </div>
                  <span className="text-[12px] text-white/30 group-hover/item:text-white/50 transition-colors">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
