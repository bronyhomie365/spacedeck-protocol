"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSend } from "react-icons/io5";
import { Loader2, HelpCircle } from "lucide-react";
import { cn } from './ui/primitives';
import { useKineticStore } from '../store/useKineticStore';
import { useKineticEngine } from '../hooks/useKineticEngine';
import { ActionGateModal } from './ActionGateModal';
import { useAccount } from 'wagmi';
import { CrystallineBorder } from './ui/CrystallineBorder';

export type TerminalState = 'COPILOT' | 'TEST_FLIGHT' | 'DIRECT_STRIKE';

export const VesselTerminal = () => {
  const [intent, setIntent] = useState("");
  const [terminalState, setTerminalState] = useState<TerminalState>('TEST_FLIGHT');
  const { isConnected } = useAccount();
  
  const activePayload = useKineticStore((state) => state.activePayload);
  const { parseIntent, isProcessing } = useKineticEngine();
  
  const isFlipped = !!activePayload;

  const handleInitiateCycle = async () => {
    if (!intent.trim() || isProcessing || isFlipped) return;
    
    if (terminalState === 'COPILOT') {
      console.log("[COPILOT ROUTE]:", intent);
      setIntent("");
      return;
    }
    await parseIntent(intent);
  };

  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  React.useEffect(() => {
    let isCancelled = false;

    const playTypingAnimation = async () => {
      const wait = (ms: number) => new Promise(res => {
        const timeout = setTimeout(res, ms);
        typingTimeoutRef.current = timeout;
      });

      setIntent("");
      let currentText = "";
      const base = "Rebalance DAO treasury: move 2.4M across ";
      const ending1 = "Kamino, Drift and Marinade.";
      const ending2 = "best APY on Solana.";

      // Phase 1: Sequential injection of origin payload
      for (let char of (base + ending1)) {
        if (isCancelled || terminalState !== 'TEST_FLIGHT') return;
        currentText += char;
        setIntent(currentText);
        await wait(30 + Math.random() * 40);
      }

      // Enter perpetual recursive tail-swap loop
      while (!isCancelled && terminalState === 'TEST_FLIGHT') {
        await wait(2200); // Saturation pause
        if (isCancelled || terminalState !== 'TEST_FLIGHT') break;

        // Strip literal parameters
        for (let b = 0; b < ending1.length; b++) {
          if (isCancelled || terminalState !== 'TEST_FLIGHT') return;
          currentText = currentText.slice(0, -1);
          setIntent(currentText);
          await wait(20 + Math.random() * 15);
        }

        await wait(400);

        // Inject abstracted parameters
        for (let char of ending2) {
          if (isCancelled || terminalState !== 'TEST_FLIGHT') return;
          currentText += char;
          setIntent(currentText);
          await wait(35 + Math.random() * 45);
        }

        await wait(2200); // Saturation pause
        if (isCancelled || terminalState !== 'TEST_FLIGHT') break;

        // Strip abstracted parameters
        for (let b = 0; b < ending2.length; b++) {
          if (isCancelled || terminalState !== 'TEST_FLIGHT') return;
          currentText = currentText.slice(0, -1);
          setIntent(currentText);
          await wait(20 + Math.random() * 15);
        }

        await wait(400);

        // Re-inject literal parameters
        for (let char of ending1) {
          if (isCancelled || terminalState !== 'TEST_FLIGHT') return;
          currentText += char;
          setIntent(currentText);
          await wait(35 + Math.random() * 45);
        }
      }
    };

    if (terminalState === 'TEST_FLIGHT' && !isFlipped) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      playTypingAnimation();
    } else {
      if (terminalState !== 'TEST_FLIGHT') setIntent("");
    }

    return () => {
      isCancelled = true;
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [terminalState, isFlipped]);

  const handleStateSwitch = (state: TerminalState) => {
    if (state === 'DIRECT_STRIKE') {
      return;
    }
    setTerminalState(state);
  };

  const getPlaceholder = () => {
    if (!isConnected) return "";
    if (terminalState === 'COPILOT') return "Ask the Docs... e.g., 'How does the Siphon work?'";
    if (terminalState === 'TEST_FLIGHT') return ""; // Handled by typing animation
    return "Execute autonomous action...";
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-2000">
      
      {/* 1. OUTER VESSEL FRAME: The Crystalline Void */}
      <motion.div 
        animate={{ height: isFlipped ? "720px" : "520px", width: isFlipped ? "1020px" : "860px" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`relative rounded-[3.5rem] overflow-hidden flex flex-col items-center justify-center shrink-0 z-[10] transition-all duration-700 ${
          isFlipped ? "shadow-none bg-transparent backdrop-blur-none" : "shadow-[0_64px_120px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-[80px]"
        }`}
        style={{
          background: isFlipped ? 'transparent' : 'radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.95) 100%)',
        }}
      >
        <CrystallineBorder borderRadius="3.5rem" />

        {/* MICRO-GRAIN */}
        <div 
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-700 mix-blend-soft-light ${isFlipped ? 'opacity-0' : 'opacity-[0.02]'}`} 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='vesselNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23vesselNoise)'/%3E%3C/svg%3E")`,
          }} 
        />

        {/* ATMOSPHERIC HEART */}
        <div className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
          <motion.img 
            src="/Light.gif"
            alt=""
            className="w-[110%] h-[110%] object-cover mix-blend-screen"
            animate={{ 
              opacity: [0.25, 0.4, 0.25],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{
              WebkitMaskImage: 'radial-gradient(circle at center, white 12%, rgba(255,255,255,0.45) 40%, transparent 68%)',
              maskImage: 'radial-gradient(circle at center, white 12%, rgba(255,255,255,0.45) 40%, transparent 68%)'
            }}
          />
        </div>

        {/* PROMPT PAD + SWITCH GEARS ASSEMBLY */}
        <div className="relative z-40 flex flex-col items-center gap-6 mt-3">
          <motion.div
            animate={{ 
              rotateY: isFlipped ? 180 : 0,
              width: isFlipped ? "940px" : "580px", 
              height: isFlipped ? "680px" : "72px",
            }}
            transition={{ duration: 0.9, type: "spring", stiffness: 50, damping: 20 }}
            className="preserve-3d flex items-center justify-center"
          >
            {/* FRONT FACE: HARDENED GLASS PAD */}
            <div className="vessel-face vessel-face-front flex items-center px-10 rounded-full shadow-[0_32px_64px_rgba(0,0,0,0.9)] relative bg-[#020617]/30 backdrop-blur-[60px] overflow-hidden border border-white/10">
              
              <div 
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] mix-blend-overlay rounded-full" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='frostedNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23frostedNoise)'/%3E%3C/svg%3E")`,
                }} 
              />

              <div 
                className="absolute inset-0 rounded-full pointer-events-none z-30"
                style={{
                  border: "1px solid transparent",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(100,200,255,0.3) 10%, rgba(255,255,255,0.5) 20%, rgba(150,100,255,0.25) 30%, rgba(255,255,255,0.05) 40%, rgba(100,200,255,0.35) 55%, rgba(255,255,255,0.5) 65%, rgba(150,100,255,0.2) 75%, rgba(255,255,255,0.08) 85%, rgba(100,200,255,0.3) 100%) border-box",
                  backgroundSize: "400% 100%",
                  WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "liquid-metal-flow 12s linear infinite",
                }}
              />

              {terminalState === 'DIRECT_STRIKE' ? (
                <div className="flex-1 z-10 flex items-center gap-3 justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#b7c8ff] animate-pulse shadow-[0_0_8px_#b7c8ff]" />
                  <span className="text-[#b7c8ff] text-[10px] uppercase tracking-[0.2em] font-black" style={{ fontFamily: 'var(--font-microgramma)' }}>
                    AWAITING AGENT PAYLOAD...
                  </span>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInitiateCycle()}
                    placeholder={getPlaceholder()}
                    className="flex-1 bg-transparent border-none text-white text-[16px] placeholder:text-white/20 outline-none font-sans z-10 relative selection:bg-blue-500/40"
                    disabled={isProcessing || isFlipped}
                  />
                  <div 
                    className={cn(
                      "ml-4 z-10 flex items-center justify-center relative group transition-transform active:scale-90 cursor-pointer",
                      (isProcessing || isFlipped) && "opacity-50 pointer-events-none"
                    )} 
                    onClick={handleInitiateCycle}
                  >
                    {isProcessing ? (
                      <Loader2 size={22} className="text-[#b7c8ff] animate-spin" />
                    ) : (
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          filter: [
                            "drop-shadow(0px 0px 0px rgba(183,200,255,0))",
                            "drop-shadow(0px 0px 12px rgba(183,200,255,0.9))",
                            "drop-shadow(0px 0px 0px rgba(183,200,255,0))"
                          ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <IoSend size={20} className="text-[#b7c8ff] transition-transform group-hover:scale-110" />
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* BACK FACE: ACTION GATE */}
            <div className="vessel-face vessel-face-back overflow-hidden rounded-[3rem] shadow-2xl bg-black/80 backdrop-blur-3xl border border-white/10">
              {isFlipped && <ActionGateModal />}
            </div>
          </motion.div>

          {/* 3. THE SWITCH GEARS - ATTACHED DIRECTLY BELOW */}
          <AnimatePresence>
            {!isFlipped && (
              <motion.div 
                className="flex items-center justify-center gap-3 z-50 pointer-events-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div 
                  className={cn(
                    "flex items-center justify-center cursor-pointer transition-all duration-300 px-5 py-2.5 rounded-full border whitespace-nowrap min-w-[140px]",
                    terminalState === 'COPILOT' 
                      ? "bg-[#b7c8ff]/10 border-[#b7c8ff]/30 shadow-[0_0_15px_rgba(183,200,255,0.1)]" 
                      : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                  )}
                  onClick={() => handleStateSwitch('COPILOT')}
                >
                  <span 
                    className="uppercase tracking-[0.1em] text-[9px] text-center block leading-none"
                    style={{ 
                      fontFamily: 'var(--font-microgramma), sans-serif',
                      fontWeight: 900,
                      color: '#b7c8ff',
                      opacity: terminalState === 'COPILOT' ? 1 : 0.6,
                      filter: terminalState === 'COPILOT' ? 'drop-shadow(0 0 8px rgba(183, 200, 255, 0.8))' : 'none'
                    }}
                  >
                    Talk to docs
                  </span>
                </div>

                <div 
                  className={cn(
                    "flex items-center justify-center cursor-pointer transition-all duration-300 px-5 py-2.5 rounded-full border whitespace-nowrap min-w-[140px]",
                    terminalState === 'TEST_FLIGHT' 
                      ? "bg-[#b7c8ff]/10 border-[#b7c8ff]/30 shadow-[0_0_15px_rgba(183,200,255,0.1)]" 
                      : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                  )}
                  onClick={() => handleStateSwitch('TEST_FLIGHT')}
                >
                  <span 
                    className="uppercase tracking-[0.1em] text-[9px] text-center block leading-none"
                    style={{ 
                      fontFamily: 'var(--font-microgramma), sans-serif',
                      fontWeight: 900,
                      color: '#b7c8ff',
                      opacity: terminalState === 'TEST_FLIGHT' ? 1 : 0.6,
                      filter: terminalState === 'TEST_FLIGHT' ? 'drop-shadow(0 0 8px rgba(183, 200, 255, 0.8))' : 'none'
                    }}
                  >
                    Test the system
                  </span>
                </div>

                <div className="relative group flex items-center justify-center">
                  <div 
                    className={cn(
                      "flex items-center justify-center cursor-pointer transition-all duration-300 px-5 py-2.5 rounded-full border whitespace-nowrap min-w-[140px]",
                      terminalState === 'DIRECT_STRIKE' 
                        ? "bg-[#b7c8ff]/10 border-[#b7c8ff]/30 shadow-[0_0_15px_rgba(183,200,255,0.1)]" 
                        : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                    )}
                    onClick={() => handleStateSwitch('DIRECT_STRIKE')}
                  >
                    <span 
                      className="uppercase tracking-[0.1em] text-[9px] text-center block leading-none"
                      style={{ 
                        fontFamily: 'var(--font-microgramma), sans-serif',
                        fontWeight: 900,
                        color: '#b7c8ff',
                        opacity: terminalState === 'DIRECT_STRIKE' ? 1 : 0.6,
                        filter: terminalState === 'DIRECT_STRIKE' ? 'drop-shadow(0 0 8px rgba(183, 200, 255, 0.8))' : 'none'
                      }}
                    >
                      Deploy autonomy 
                    </span>
                  </div>
                  
                  {/* TOOLTIP */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-[280px] p-3 rounded-2xl bg-black/95 border border-[#b7c8ff]/30 backdrop-blur-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,1)] scale-90 group-hover:scale-100 z-[100]">
                    <p className="text-[9px] text-[#b7c8ff] text-center uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-microgramma), sans-serif', fontWeight: 900 }}>
                      Click on "CONNECT AGENT" in upper right corner and follow instructions.
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-black/95" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
