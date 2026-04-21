"use client";
import React from 'react';
import { cn } from './ui/primitives';
import { NavDropdown } from './NavDropdown';

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
export const SovereignNavbar: React.FC<SovereignNavbarProps> = ({ children, className }) => {
  const setTruthShard = useKineticStore((state) => state.setTruthShard);
  const setSolverMode = useKineticStore((state) => state.setSolverMode);

  return (
    <header className={cn(
      "fixed top-6 left-6 right-6 z-[400] flex items-baseline justify-between",
      "h-20 px-10 rounded-full border border-white/5",
      // SOLID GRAINY MORPHISM: Opaque base + Extreme Blur + Saturation
      "bg-[#6d6c6d]/40 backdrop-blur-[40px] backdrop-saturate-[180%]",
      "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]",
      className
    )}>
      {/* Precision Vertical Centering of the Baseline Axis */}
      <style>{`
        header > div, header > nav {
          transform: translateY(2px); /* Precision nudge to align baseline to geometric center */
          align-self: center;
        }
      `}</style>
      {/* AMPLIFIED HIGH-DEFINITION GRAIN LAYER */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sharpNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sharpNoise)'/%3E%3C/svg%3E")`,
          filter: 'contrast(1.5) brightness(0.9)', // Deepen grain intensity
        }}
      />

      {/* LEFT WING: Official Identity Logo */}
      <div className="relative z-30 flex items-center min-w-[150px]">
        <img 
          src="/spacedeck7.png" 
          alt="SPACEDECK" 
          className="h-10 w-auto object-contain opacity-90 drop-shadow-[0_0_10px_rgba(183,200,255,0.2)]" 
        />
      </div>

      {/* CENTER WING: High-End Dropdown Cluster */}
      <nav className="relative z-30 flex items-center gap-2 translate-x-[60px]">
        <NavDropdown 
          label="Execution" 
          onClickLabel={() => {
            const el = document.getElementById('science-manifest');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          items={[
            { 
              label: "The Prism Effect", 
              onClick: () => {
                setTruthShard(null);
                const el = document.getElementById('manifest-prism');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } 
            },
            { 
              label: "Solver Auction", 
              onClick: () => {
                setTruthShard(null);
                const el = document.getElementById('manifest-settlement');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } 
            },
            { 
              label: "Compliance Gate", 
              onClick: () => {
                setTruthShard(null);
                const el = document.getElementById('manifest-compliance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } 
            },
            { 
              label: "Settlement Bridge", 
              onClick: () => {
                setTruthShard(null);
                const el = document.getElementById('manifest-settlement');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } 
            }
          ]} 
        />
        <NavDropdown 
          label="Security" 
          items={[
            { label: "EIP-2612 Permits", onClick: () => setTruthShard('permits') },
            { label: "Keyless Near MPC", onClick: () => setTruthShard('mpc') },
            { label: "Audits", onClick: () => setTruthShard('audits') }
          ]} 
        />
        <NavDropdown 
          label="Developers" 
          items={[
            { label: "Eliza Framework", onClick: () => setTruthShard('eliza') },
            { label: "Zerebro Framework", onClick: () => setTruthShard('zerebro') },
            { label: "REST API", onClick: () => setTruthShard('api') }
          ]} 
        />
        <a 
          href="https://docs.spacedeck.xyz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-baseline gap-[4px] px-5 py-2 rounded-full transition-all duration-500 hover:bg-white/[0.04] group"
        >
          <span 
            className="font-medium text-white group-hover:brightness-125 transition-all"
            style={{
              fontSize: "14px", 
              fontFamily: 'var(--font-questrial), sans-serif',
              letterSpacing: '0.05em',
              display: 'inline-block',
            }}
          >
            Docs
          </span>
          <span 
            className="text-[12px] text-white transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
            style={{ marginBottom: '0px', verticalAlign: 'baseline' }}
          >
            🡭
          </span>
        </a>
        <button 
          className="flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-500 hover:bg-white/[0.04] group"
          onClick={() => setSolverMode(true)}
        >
          <span 
            className="font-medium group-hover:brightness-125 transition-all"
            style={{
              fontSize: "14px", 
              color: "#cdd8ff", 
              fontFamily: 'var(--font-questrial), sans-serif',
              letterSpacing: '0.05em',
              display: 'inline-block',
            }}
          >
            Solver Portal
          </span>
          <span 
            className="text-[10px] opacity-50 group-hover:opacity-100 transition-all duration-500"
            style={{ color: "#cdd8ff", fontFamily: 'serif', marginBottom: '-1px' }}
          >
            ❉
          </span>
        </button>
      </nav>

      {/* RIGHT WING: The Command Cluster (Buttons) */}
      <div className="relative z-30 flex items-center gap-6 min-w-[150px] justify-end">
        {children}
      </div>
    </header>
  );
};
