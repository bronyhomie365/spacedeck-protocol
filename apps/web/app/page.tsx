"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrystallineBackground from '../components/CrystallineBackground';
import { SovereignNavbar } from '../components/SovereignNavbar';
import { NavigationDock } from '../components/NavigationDock';
import { VesselTerminal } from '../components/VesselTerminal';
import { ScienceManifestSection } from '../components/ScienceManifestSection';
import { ExecutionPortal } from '../components/ExecutionPortal';
import { TheOrchard } from '../components/TheOrchard';
import { CortexLogs } from '../components/CortexLogs';
import { SolverPortal } from '../components/SolverPortal';
import { TruthShardPayload } from '../components/TruthShardPayload';
import { ConnectAgentButton } from '../components/ConnectAgentButton';
import { LiquidMetalButton } from '../components/LiquidMetalButton';
import { BudgetDelegationModal } from '../components/BudgetDelegationModal';
import { AgentSignalBadge } from '../components/AgentSignalBadge';
import { AgentInstructions } from '../components/AgentInstructions';
import { cn } from '../components/ui/primitives';
import { useKineticStore } from '../store/useKineticStore';
import { AtomicSwarm } from '../components/ui/AtomicSwarm';
import { KineticTransition } from '../components/KineticTransition';
import { useWalletModal } from '../hooks/useWalletModalShim';

// [GLASS SHIP]: Full Observability Terminal restored with V3 pipeline alignment.

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSwarm, setShowSwarm] = useState(false);
  const truthShard = useKineticStore((state) => state.truthShard);
  const setTruthShard = useKineticStore((state) => state.setTruthShard);
  const solverMode = useKineticStore((state) => state.solverMode);
  const setSolverMode = useKineticStore((state) => state.setSolverMode);
  const isAgentMode = useKineticStore((state) => state.isAgentMode);
  const { setVisible } = useWalletModal();

  const setShowAuthModal = useKineticStore((state) => state.setShowAuthModal);
  const showAuthModal = useKineticStore((state) => state.showAuthModal);
  const isUnlocked = useKineticStore((state) => state.isUnlocked);
  const setUnlocked = useKineticStore((state) => state.setUnlocked);

  const handleConnectAgent = () => {
    setShowAuthModal(true);
  };

  const handleUnlock = () => {
    setUnlocked(true);
    setShowSwarm(true);
    setTimeout(() => setShowSwarm(false), 2500);
  };

  const isHome = activeSection === 'home' && !truthShard && !solverMode && !isAgentMode;

  return (
    <>
      {/* TOP DEEP BLUE VIGNETTE (LEGACY) */}
      {!isUnlocked && isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none z-[300]"
          style={{
            background: `radial-gradient(ellipse 140vw 75vh at 50% 0%, #020617 0%, #020617 45%, rgba(2,6,23,0.7) 65%, transparent 100%)`,
          }}
        />
      )}

      <SovereignNavbar>
        {!isUnlocked ? (
          <LiquidMetalButton 
            label="Enter the Space" 
            onClick={handleUnlock} 
            className="z-[1000]"
          />
        ) : (
          <ConnectAgentButton onClick={handleConnectAgent} />
        )}
      </SovereignNavbar>

      {/* MAIN CONTENT AREA */}
      <AnimatePresence mode="wait">
        {/* CINEMATIC TAGLINE — 1:1 legacy Glass Ship restoration */}
        {!isUnlocked && isHome && (
          <motion.div 
            key="tagline"
            className="absolute top-[calc(50%-260px)] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-[1000] holofractal-reveal"
            style={{ width: 'max-content' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <style>{`
              .bubbly-grad {
                background: linear-gradient(to right, #7bacfc 0%, #ffffff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                filter:
                  drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.9))
                  drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.6))
                  drop-shadow(0px 18px 30px rgba(0, 0, 0, 0.4));
              }
            `}</style>
            <div
              className="flex flex-col items-start"
              style={{
                fontFamily: "var(--font-bubbly), sans-serif",
                fontSize: '34.5px',
                lineHeight: '1.1',
                letterSpacing: '0.03em',
              }}
            >
              <div className="bubbly-grad">Bootstrap your AI to command</div>
              <div className="flex whitespace-pre items-baseline">
                <span className="bubbly-grad">on-chain capital </span>
                <span
                  style={{
                    fontFamily: "var(--font-questrial), sans-serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.88)',
                    fontSize: '34.5px',
                    WebkitTextFillColor: 'rgba(255,255,255,0.88)',
                    filter: 'none',
                  }}
                >without friction, slippage, or</span>
              </div>
              <div
                className="self-end"
                style={{
                  fontFamily: "var(--font-questrial), sans-serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: '34.5px',
                  WebkitTextFillColor: 'rgba(255,255,255,0.88)',
                  filter: 'none',
                  marginTop: '4px',
                }}
              >human intervention</div>
            </div>
          </motion.div>
        )}

        {isHome && (
          <main key="home" className="relative z-10 holofractal-reveal">
            {/* VESSEL TERMINAL (HERO) */}
            <section className="relative h-screen flex items-center justify-center px-20 overflow-hidden">
              {/* LOCALIZED ATMOSPHERE — Restored vibe, localized to hero */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <CrystallineBackground containerClassName="absolute!" />
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, #020617 100%)',
                  }}
                />
              </div>

              {/* HOLOFRACTAL MANIFESTATION OVERLAY */}
              <div className="scanline-sweep" />

              <div className={cn(
                "relative z-20 flex items-center justify-center transition-opacity duration-1000",
                isUnlocked 
                  ? "opacity-100 blur-0" 
                  : "opacity-[0.55] saturate-[0.4] pointer-events-none"
              )} style={!isUnlocked ? { filter: 'brightness(1.55)' } : {}}>
                
                {/* CENTERED TERMINAL ANCHOR */}
                <div className="relative flex items-center justify-center z-[205]">
                  
                  {/* CATEGORIES (DOCK) — Absolutely pegged to terminal left */}
                  <div className="absolute right-[calc(100%+56px)] top-1/2 -translate-y-1/2 z-[210] shrink-0">
                    <NavigationDock 
                      activeId={activeSection} 
                      onSelect={(id) => {
                        setActiveSection(id);
                        setTruthShard(null);
                        setSolverMode(false);
                      }} 
                    />
                  </div>

                  <VesselTerminal />
                </div>
              </div>

              {/* SCROLL INDICATOR */}
              {!isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => {
                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                  }}
                >
                  <span 
                    className="text-[9px] uppercase tracking-[0.25em] font-bold transition-colors text-[#b7c8ff]/50 group-hover:text-[#b7c8ff]/90" 
                    style={{ fontFamily: 'var(--font-microgramma), sans-serif' }}
                  >
                    How it works
                  </span>
                  <motion.div
                    animate={{ y: [0, 6, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[20px] text-[#b7c8ff] group-hover:text-[#b7c8ff] transition-all duration-700 drop-shadow-[0_0_10px_rgba(183,200,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(183,200,255,0.4)] leading-none"
                  >
                    ↓
                  </motion.div>
                </motion.div>
              )}
            </section>

            {/* SCIENCE MANIFEST (SCROLLABLE LANDING) — Pure 1-Layer BG */}
            <div className="relative z-20">
              <KineticTransition />
              <div className="bg-[#020617]">
                <ScienceManifestSection />
              </div>
            </div>
          </main>
        )}

        {/* CAPITAL DASHBOARD (TheOrchard) */}
        {activeSection === 'capital' && !solverMode && (
          <main key="capital" className="relative z-10 min-h-screen flex items-center justify-center px-20 pt-20">
            <div className="flex items-center justify-center gap-14 transition-all duration-1000">
              <div className="z-[210] shrink-0">
                <NavigationDock activeId={activeSection} onSelect={setActiveSection} />
              </div>
              <div className="relative flex items-center justify-center min-h-[720px] z-[205]">
                <TheOrchard />
              </div>
              <div className="w-[84px] shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </main>
        )}

        {/* TELEMETRY TERMINAL (CortexLogs) */}
        {activeSection === 'log' && !solverMode && (
          <main key="log" className="relative z-10 min-h-screen flex items-center justify-center px-20 pt-20">
            <div className="flex items-center justify-center gap-14 transition-all duration-1000">
              <div className="z-[210] shrink-0">
                <NavigationDock activeId={activeSection} onSelect={setActiveSection} />
              </div>
              <div className="relative flex items-center justify-center min-h-[720px] z-[205]">
                <CortexLogs />
              </div>
              <div className="w-[84px] shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </main>
        )}

        {/* EXECUTION PORTAL (Deep Dive) */}
        {activeSection === 'settings' && !solverMode && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center justify-center gap-14 transition-all duration-1000">
              <div className="z-[210] shrink-0">
                <NavigationDock activeId={activeSection} onSelect={setActiveSection} />
              </div>
              <ExecutionPortal key="execution" active={true} />
              <div className="w-[84px] shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* SOLVER PORTAL */}
        {solverMode && (
          <SolverPortal key="solver" active={true} />
        )}

        {/* AGENT INSTRUCTIONS PORTAL */}
        {isAgentMode && (
          <div key="agent-instructions" className="absolute inset-0 z-[200] bg-[#020617] overflow-y-auto">
            <AgentInstructions active={true} />
          </div>
        )}
      </AnimatePresence>

      {/* TRUTH SHARD OVERLAY */}
      {truthShard && (
        <TruthShardPayload activeShard={truthShard} />
      )}

      {/* AGENT SIGNAL BADGE (LEGACY) */}
      {!isUnlocked && isHome && (
        <AgentSignalBadge />
      )}

      {/* CRYSTAL BLUE BUBBLES — OG the_glass_ship aesthetic restored */}
      {showSwarm && <AtomicSwarm active={true} />}

      {/* AUTH MODAL OVERLAY */}
      <BudgetDelegationModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}
