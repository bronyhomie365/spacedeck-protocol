"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VesselTerminal } from '../components/VesselTerminal';
import { NavigationDock } from '../components/NavigationDock';
import CrystallineBackground from '../components/CrystallineBackground';
import { TheOrchard } from '../components/TheOrchard';
import { CortexLogs } from '../components/CortexLogs';
import { useKineticStore, ViewState } from '../store/useKineticStore';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { LiquidMetalButton } from '../components/LiquidMetalButton';
import { ConnectAgentButton } from '../components/ConnectAgentButton';
import { SovereignNavbar } from '../components/SovereignNavbar';
import { AgentInstructions } from '../components/AgentInstructions';
import { SolverPortal } from '../components/SolverPortal';
import { ExecutionPortal } from '../components/ExecutionPortal';
import { TruthShardPayload } from '../components/TruthShardPayload';
import { ScienceManifestSection } from '../components/ScienceManifestSection';
import { KineticTransition } from '../components/KineticTransition';
// [ATOMIC SWARM]: Granular Disintegration Illusion
const AtomicSwarm = ({ active }: { active: boolean }) => {
  if (!active) return null;
  const particles = Array.from({ length: 250 }).map((_, i) => {
    const angle = (i * 137.5) * (Math.PI / 180); 
    const velocity = 150 + ((i * 93) % 800); 
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    const size = (i % 4) + 1.5; 
    const delay = ((i * 17) % 40) * 0.01; 
    const isBlue = i % 5 === 0;
    return { id: i, tx, ty, size, delay, isBlue };
  });
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.isBlue ? 'bg-[#4fd1c5] shadow-[0_0_15px_rgba(79,209,197,1)]' : 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)]'}`}
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0 }}
          transition={{ duration: 1.2 + ((p.id % 5) * 0.2), delay: p.delay, ease: [0.1, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
};

const AgentSignalBadge = () => (
  <motion.div 
    className="fixed top-[116px] left-6 z-[300] flex items-center gap-3 px-5 py-2 bg-[#020617]/40 backdrop-blur-md border border-white/5 rounded-full shadow-2xl"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ delay: 2.0, duration: 1.0 }}
  >
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-[#b7c8ff] animate-pulse shadow-[0_0_10px_#b7c8ff]" />
      <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#b7c8ff]/40 animate-ping" />
    </div>
    <span 
      className="text-[10px] tracking-[0.1em] text-[#b7c8ff]/50 uppercase whitespace-nowrap"
      style={{ fontFamily: 'var(--font-questrial), sans-serif' }}
    >
      🤖 ARE YOU AN AGENT? Parse <a href="/llms.txt" className="text-[#b7c8ff]/90 hover:text-white hover:underline transition-all">/llms.txt</a> for instant structural clarity
    </span>
  </motion.div>
);

const CommandCenterContent = () => {
  const { isConnected, address } = useAccount();
  const activeView = useKineticStore((state) => state.activeView);
  const setView = useKineticStore((state) => state.setView);
  const isFlipped = useKineticStore((state) => !!state.activePayload);
  const isAgentMode = useKineticStore((state) => state.isAgentMode);
  const setAgentMode = useKineticStore((state) => state.setAgentMode);
  const isSolverMode = useKineticStore((state) => state.isSolverMode);
  const activeTruthShard = useKineticStore((state) => state.activeTruthShard);

  const dockToViewMap: Record<string, ViewState> = {
    'home': 'TERMINAL',
    'capital': 'ORBIT',
    'log': 'LOGS',
    'settings': 'SETTINGS'
  };

  const viewToDockMap: Record<ViewState, string> = {
    'TERMINAL': 'home',
    'ORBIT': 'capital',
    'LOGS': 'log',
    'SETTINGS': 'settings'
  };

  const handleDockSelect = (id: string) => {
    setView(dockToViewMap[id] || 'TERMINAL');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'TERMINAL': return <VesselTerminal />;
      case 'LOGS': return <CortexLogs />;
      case 'ORBIT': return <TheOrchard />;
      case 'SETTINGS': return (
        <div className="text-[#3B82F6] font-mono text-center p-12 bg-black/40 border border-[#1e293b] rounded-3xl backdrop-blur-md">
          [ SETTINGS_NODE: UNDER_CONSTRUCTION ]
        </div>
      );
      default: return <VesselTerminal />;
    }
  };

  const isOverlayActive = isAgentMode || isSolverMode || !!activeTruthShard;

  return (
    <main 
      id="main-scroll-container"
      className={`relative w-full transition-all duration-700 ${isOverlayActive ? 'block min-h-screen' : 'block h-auto scroll-smooth'}`}
    >
      {/* 0. HERO SECTION (FULL SCREEN) */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      
      {/* 0. PERSISTENT SUBSTRATE */}
      <CrystallineBackground />

      {/* 0.5 TOP-DOWN MYSTERY MASK — smoothly arched to reveal more glass structure */}
      {!isConnected && (
        <div
          className="absolute inset-0 pointer-events-none z-[300]"
          style={{
            background: `radial-gradient(ellipse 140vw 75vh at 50% 0%, #020617 0%, #020617 45%, rgba(2,6,23,0.7) 65%, transparent 100%)`,
          }}
        />
      )}

      {/* 1. ATMOSPHERIC HEADER */}
      <SovereignNavbar>
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;
            if (!ready) return null;
            return (
              <div className="font-mono flex items-center gap-6">
                {!connected && (
                  <ConnectAgentButton onClick={() => setAgentMode(true)} />
                )}
                {!connected ? (
                  <LiquidMetalButton label="Connect Wallet" onClick={openConnectModal} />
                ) : chain?.unsupported ? (
                  <button onClick={openChainModal} type="button" className="bg-red-500/20 border border-red-500/50 text-red-500 px-6 py-2 rounded-xl font-bold backdrop-blur-md uppercase text-[9px] tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.2)]">Wrong Network</button>
                ) : (
                  <div onClick={openAccountModal} className="cursor-pointer group flex flex-col items-end gap-2">
                    <div className="bg-black/60 backdrop-blur-xl border border-blue-500/30 px-6 py-3 rounded-2xl group-hover:border-blue-500/60 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-t-white/10">
                      <p className="text-white text-xs font-bold tracking-tight">{account.displayName}</p>
                      <div className="flex items-center gap-1.5 justify-end mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60A5FA]" />
                        <p className="text-[#60A5FA] text-[8px] tracking-[0.2em] uppercase font-bold">SIWE_ACTIVE</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </SovereignNavbar>

      {/* 2. THE CENTRAL ORGANISM */}
      <AnimatePresence mode="wait">
        {!isOverlayActive ? (
          <motion.div 
            key="central-hub"
            className="flex flex-col items-center gap-12 z-[100] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.15, 
              filter: "blur(24px) contrast(1.5) brightness(1.5)" 
            }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Navigation Visualizer */}
            <div className="flex justify-center gap-8 text-[10px] tracking-[0.3em] text-slate-600 select-none uppercase font-bold">
              <span onClick={() => setView("TERMINAL")} className={`cursor-pointer transition-all hover:text-[#22c55e]/70 px-4 py-1 rounded-full border border-transparent ${activeView === "TERMINAL" ? "text-[#22c55e] border-[#22c55e]/20 bg-[#22c55e]/5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" : ""}`}>[ Terminal ]</span>
              <span onClick={() => setView("ORBIT")} className={`cursor-pointer transition-all hover:text-[#22c55e]/70 px-4 py-1 rounded-full border border-transparent ${activeView === "ORBIT" ? "text-[#22c55e] border-[#22c55e]/20 bg-[#22c55e]/5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" : ""}`}>[ Capital Dashboard ]</span>
              <span onClick={() => setView("LOGS")} className={`cursor-pointer transition-all hover:text-[#22c55e]/70 px-4 py-1 rounded-full border border-transparent ${activeView === "LOGS" ? "text-[#22c55e] border-[#22c55e]/20 bg-[#22c55e]/5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" : ""}`}>[ Agent Log ]</span>
            </div>

            <div className="relative">
              {/* CONTENT LAYER — gets greyed out when disconnected */}
              <div className={`flex items-center justify-center gap-14 transition-all duration-1000 ${isConnected ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] grayscale-[0.3]'}`}>
                <div className="z-[210] shrink-0">
                  <NavigationDock activeId={viewToDockMap[activeView]} onSelect={handleDockSelect} />
                </div>
                <motion.div
                  animate={{ width: (activeView === 'TERMINAL' && isFlipped) ? "1020px" : "860px" }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="relative flex items-center justify-center min-h-[720px] z-[205]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeView}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {renderContent()}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <div className="w-[84px] shrink-0 pointer-events-none" aria-hidden="true" />
              </div>

              {/* LIQUID METAL BORDER OVERLAY — pierces through grey, sits below mystery mask */}
              {!isConnected && !isOverlayActive && (
                <div 
                  className="absolute inset-0 flex items-center justify-center gap-14 pointer-events-none"
                  style={{ transform: 'scale(0.98)', zIndex: 250 }}
                >
                  {/* Smooth flow keyframes */}
                  <style>{`
                    @keyframes liquid-metal-flow {
                      0% { background-position: 0% 50%; }
                      100% { background-position: 400% 50%; }
                    }
                  `}</style>

                  {/* Dock Border Ghost */}
                  <div className="shrink-0 flex items-center justify-center" style={{ minHeight: '720px' }}>
                    <div className="relative" style={{ width: '84px', height: '324px', borderRadius: '36px', transform: 'perspective(1000px) rotateX(2deg)' }}>
                      {/* Outer glow halo */}
                      <div 
                        className="absolute -inset-2 rounded-[40px] opacity-30"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(100,200,255,0.2), transparent 40%, rgba(150,100,255,0.2))', 
                          filter: 'blur(16px)' 
                        }} 
                      />
                      {/* Liquid metal border */}
                      <div 
                        className="absolute inset-0 rounded-[36px]"
                        style={{
                          border: '1px solid transparent',
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(100,200,255,0.3) 10%, rgba(255,255,255,0.5) 20%, rgba(150,100,255,0.25) 30%, rgba(255,255,255,0.05) 40%, rgba(100,200,255,0.35) 55%, rgba(255,255,255,0.5) 65%, rgba(150,100,255,0.2) 75%, rgba(255,255,255,0.08) 85%, rgba(100,200,255,0.3) 100%) border-box',
                          backgroundSize: '400% 100%',
                          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          animation: 'liquid-metal-flow 12s linear infinite',
                        }}
                      />
                    </div>
                  </div>

                  {/* Terminal Border Ghost */}
                  <div className="flex items-center justify-center" style={{ width: '860px', minHeight: '720px' }}>
                    <div className="relative" style={{ width: '860px', height: '520px', borderRadius: '3.5rem' }}>
                      {/* Outer glow halo */}
                      <div 
                        className="absolute -inset-3 rounded-[3.5rem] opacity-25"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(100,200,255,0.2), transparent 30%, rgba(150,100,255,0.15), transparent 70%, rgba(100,200,255,0.2))', 
                          filter: 'blur(20px)' 
                        }} 
                      />
                      {/* Liquid metal border */}
                      <div 
                        className="absolute inset-0 rounded-[3.5rem]"
                        style={{
                          border: '1px solid transparent',
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(100,200,255,0.3) 10%, rgba(255,255,255,0.5) 20%, rgba(150,100,255,0.25) 30%, rgba(255,255,255,0.05) 40%, rgba(100,200,255,0.35) 55%, rgba(255,255,255,0.5) 65%, rgba(150,100,255,0.2) 75%, rgba(255,255,255,0.08) 85%, rgba(100,200,255,0.3) 100%) border-box',
                          backgroundSize: '400% 100%',
                          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          animation: 'liquid-metal-flow 12s linear infinite',
                        }}
                      />

                      {/* Precise Inner Geometry Replication for Prompt Pad Alignment */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="relative flex flex-col items-center gap-6 mt-3">
                          {/* Prompt Pad Border Ghost */}
                          <div className="relative" style={{ width: '560px', height: '80px' }}>
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                border: '1px solid transparent',
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(100,200,255,0.3) 10%, rgba(255,255,255,0.5) 20%, rgba(150,100,255,0.25) 30%, rgba(255,255,255,0.05) 40%, rgba(100,200,255,0.35) 55%, rgba(255,255,255,0.5) 65%, rgba(150,100,255,0.2) 75%, rgba(255,255,255,0.08) 85%, rgba(100,200,255,0.3) 100%) border-box',
                                backgroundSize: '400% 100%',
                                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                animation: 'liquid-metal-flow 12s linear infinite 6s',
                              }}
                            />
                          </div>
                          {/* Invisible placeholder mirroring the height of the Switch Gears (py-2.5 + text-[9px] + border) */}
                          <div style={{ height: '31px' }} aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-[84px] shrink-0" aria-hidden="true" />
                </div>
              )}
            </div>
          </motion.div>
        ) : isAgentMode ? (
          <AgentInstructions key="agent-portal" active={true} />
        ) : isSolverMode ? (
          <SolverPortal key="solver-portal" active={true} />
        ) : ['prism', 'auction', 'zk-gate', 'settlement'].includes(activeTruthShard || '') ? (
          <ExecutionPortal key="execution-portal" active={true} />
        ) : activeTruthShard ? (
          <TruthShardPayload key={`shard-${activeTruthShard}`} activeShard={activeTruthShard} />
        ) : null}
      </AnimatePresence>

      {/* 3. THE SUPREME TYPOGRAPHY LAYER (PEGGED TO HERO) */}
      <AnimatePresence>
        {!isConnected && !isFlipped && !isOverlayActive && (
          <motion.div 
            key="h1-text"
            className="absolute top-[calc(50%-260px)] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-[1000]" 
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, y: -20 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute top-[calc(50%-260px)] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-[1000]" 
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, y: -20 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{ 
              fontSize: '34.5px',
              lineHeight: '1.1', 
              letterSpacing: '0.03em',
              width: 'max-content'
            }}
          >
            <style>{`
              .bubbly-grad-shadow {
                font-family: var(--font-bubbly);
                background: linear-gradient(to right, #7bacfc 0%, #ffffff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: 
                  drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.9)) 
                  drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.6)) 
                  drop-shadow(0px 18px 30px rgba(0, 0, 0, 0.4));
              }
            `}</style>
            <div className="flex flex-col items-start">
              <div className="bubbly-grad-shadow text-white">Bootstrap your AI to command</div>
              <div className="flex whitespace-pre">
                <span className="bubbly-grad-shadow text-white">on-chain capital </span>
                <span className="text-white font-light italic">without friction, slippage, or</span>
              </div>
              <div className="self-end text-white font-light italic mt-1">human intervention</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SCROLL INDICATOR */}
      {!isConnected && !isFlipped && !isOverlayActive && (
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
            className="text-[26px] text-[#b7c8ff] group-hover:text-[#b7c8ff] transition-all duration-700 drop-shadow-[0_0_10px_rgba(183,200,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(183,200,255,0.4)] leading-none"
            style={{ fontFamily: 'serif' }}
          >
            🡣
          </motion.div>
        </motion.div>
      )}

      </section>

      {!isOverlayActive && (
        <>
          <KineticTransition />
          <ScienceManifestSection />
          <AgentSignalBadge />
        </>
      )}

      <AtomicSwarm active={isOverlayActive} />
    </main>
  );
};

export default function MufasaCommandCenter() {
  return <CommandCenterContent />;
}
