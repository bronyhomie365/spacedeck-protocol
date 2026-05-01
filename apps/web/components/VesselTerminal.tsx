"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from "lucide-react";

// [ASCII MORPH]: 8 unique geometric progressions — one per atomic sentence
const MORPH_SETS = [
  { g: ['░', '▒', '▓', '█', '▓', '▒'], s: 180, c: '#b7c8ff' },  // 0: shading blocks — data materializing
  { g: ['○', '◎', '◉', '●', '◉', '◎'], s: 160, c: '#b7c8ff' },  // 1: circles crystallizing — MPC handshake
  { g: ['◇', '◈', '◆', '◈', '◇'], s: 200, c: '#b7c8ff' },        // 2: diamond lock — PDA auth
  { g: ['▱', '▰', '▬', '▰', '▱'], s: 250, c: '#b7c8ff' },        // 3: parallelogram morph — compliance
  { g: ['◢', '◣', '◤', '◥'], s: 90, c: '#b7c8ff' },              // 4: rotating triangles — MEV bypass (fast)
  { g: ['▤', '▥', '▦', '▧', '▨', '▩'], s: 150, c: '#b7c8ff' },  // 5: square fills — geometry alignment
  { g: ['▲', '▶', '▼', '◀'], s: 100, c: '#b7c8ff' },             // 6: rotating solid arrows — bundle kinetics
  { g: ['◆', '◇', '◆', '◇'], s: 500, c: '#b7c8ff' },             // 7: slow pulse — final landing
];
import { cn } from './ui/primitives';
import { useKineticStore } from '../store/useKineticStore';
import { useKineticEngine } from '../hooks/useKineticEngine';
import { ActionGateModal } from './ActionGateModal';
import { useWallet } from '../hooks/useWalletShim';
import { CrystallineBorder } from './ui/CrystallineBorder';
import { HyperspaceEffect } from './ui/HyperspaceEffect';
import { BudgetDelegationModal } from './BudgetDelegationModal';

export type TerminalState = 'COPILOT' | 'TEST_FLIGHT' | 'DIRECT_STRIKE';

// [AGENT INTENTS]: 8 atomic sentences — one mechanism, one result
const AGENT_INTENTS = [
  "Ingesting agent intent. Deterministic JSON schema locked.",
  "Requesting Near MPC threshold. Zero key exposure.",
  "Authorizing PDA budget ceiling. $1M agent capital sealed.",
  "Clearing compliance sentinel. Institutional schema validated.",
  "Bypassing public mempool. 100% MEV extraction blocked.",
  "Aligning validator geometry. Sub-400ms settlement locked.",
  "Compiling Jito bundle. Atomic strike in progress.",
  "Bundle landed. No private key touched. Ever.",
];

export const VesselTerminal = () => {
  const [intent, setIntent] = useState("");
  const [terminalState, setTerminalState] = useState<TerminalState>('TEST_FLIGHT');
  const [borderPulse, setBorderPulse] = useState(false);
  const [morphIndex, setMorphIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const setShowAuthModal = useKineticStore((state) => state.setShowAuthModal);
  const { connected: isConnected } = useWallet();
  
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

    const typeText = async (text: string, speed: number = 22) => {
      let currentText = "";
      for (let char of text) {
        if (isCancelled || terminalState !== 'TEST_FLIGHT') return "";
        currentText += char;
        setIntent(currentText);
        await new Promise(res => {
          typingTimeoutRef.current = setTimeout(res, speed + Math.random() * (speed * 0.6));
        });
      }
      return currentText;
    };

    const clearText = async (currentText: string) => {
      let text = currentText;
      while (text.length > 0) {
        if (isCancelled || terminalState !== 'TEST_FLIGHT') return;
        text = text.slice(0, -1);
        setIntent(text);
        await new Promise(res => {
          typingTimeoutRef.current = setTimeout(res, 8 + Math.random() * 6);
        });
      }
    };

    const hold = (ms: number) => new Promise(res => {
      typingTimeoutRef.current = setTimeout(res, ms);
    });

    const playPipelineDemo = async () => {
      setIntent("");
      let i = 0;

      while (!isCancelled && terminalState === 'TEST_FLIGHT') {
        const idx = i % AGENT_INTENTS.length;
        setSentenceIndex(idx);
        setMorphIndex(0);

        // Trigger teal border pulse on auth sentences
        if (idx === 2 || idx === 3) {
          setBorderPulse(true);
          setTimeout(() => setBorderPulse(false), 1800);
        }

        // Type the atomic sentence
        const typed = await typeText(AGENT_INTENTS[idx], 22);
        if (isCancelled || terminalState !== 'TEST_FLIGHT') break;
        await hold(idx === 7 ? 2000 : 1100); // Final sentence holds longer

        // Clear and advance
        if (isCancelled || terminalState !== 'TEST_FLIGHT') break;
        await clearText(typed);
        await hold(400);
        i++;
      }
    };

    if (terminalState === 'TEST_FLIGHT' && !isFlipped) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setSentenceIndex(0);
      playPipelineDemo();
    } else {
      if (terminalState !== 'TEST_FLIGHT') setIntent("");
    }

    return () => {
      isCancelled = true;
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [terminalState, isFlipped]);

  // [ASCII MORPH INTERVAL]: Each sentence drives its own glyph set + speed
  const currentMorphSet = MORPH_SETS[sentenceIndex] ?? MORPH_SETS[0];

  useEffect(() => {
    const { g, s } = currentMorphSet;
    const interval = setInterval(() => {
      setMorphIndex(prev => (prev + 1) % g.length);
    }, s);
    return () => clearInterval(interval);
  }, [sentenceIndex]);

  const handleStateSwitch = (state: TerminalState) => {
    if (state === 'DIRECT_STRIKE') return;
    setTerminalState(state);
  };

  const getPlaceholder = () => {
    if (!isConnected) return "";
    if (terminalState === 'COPILOT') return "Ask the Docs...";
    if (terminalState === 'TEST_FLIGHT') return "";
    return "Execute autonomous action...";
  };

  // [ASCII MORPH RENDERER]: Sentence-indexed glyph with phase-appropriate glow
  const renderMorphGlyph = () => {
    const { g, c } = currentMorphSet;
    const glyph = g[morphIndex % g.length];
    const isAuth = sentenceIndex === 2 || sentenceIndex === 3;
    const isStrike = sentenceIndex >= 4 && sentenceIndex <= 6;
    const isFinal = sentenceIndex === 7;
    const glow = isFinal
      ? 'drop-shadow(0 0 16px rgba(183,200,255,1)) drop-shadow(0 0 6px rgba(183,200,255,0.8))'
      : isStrike
        ? 'drop-shadow(0 0 12px rgba(183,200,255,0.7))'
        : isAuth
          ? 'drop-shadow(0 0 14px rgba(183,200,255,0.9))'
          : 'drop-shadow(0 0 8px rgba(183,200,255,0.4))';

    return (
      <AnimatePresence mode="wait">
        <motion.span
          key={sentenceIndex}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.25 }}
          className="text-[15px] font-mono select-none leading-none shrink-0"
          style={{ color: c, filter: glow }}
        >
          {glyph}
        </motion.span>
      </AnimatePresence>
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-2000">
      <motion.div 
        initial={{ height: "520px", width: "860px", opacity: 0 }}
        animate={{ height: isFlipped ? "720px" : "520px", width: isFlipped ? "1020px" : "860px", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`relative rounded-[3.5rem] overflow-hidden flex flex-col items-center justify-center shrink-0 z-[10] ${isFlipped ? "shadow-none bg-transparent backdrop-blur-none" : "shadow-[0_64px_120px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-[80px]"}`}
        style={{ 
          background: isFlipped ? 'transparent' : 'radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.95) 100%)',
          willChange: 'transform, opacity, height, width'
        }}
      >
        <CrystallineBorder borderRadius="3.5rem" />
        <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-700 mix-blend-soft-light ${isFlipped ? 'opacity-0' : 'opacity-[0.02]'}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='vesselNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23vesselNoise)'/%3E%3C/svg%3E")` }} />
        <div className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
          <HyperspaceEffect color="#4fd1c5" count={140} speed={1.5} />
        </div>

        <div className="relative z-40 flex flex-col items-center gap-6 mt-3">
          <motion.div
            initial={{ rotateY: 0, width: "580px", height: "72px" }}
            animate={{ rotateY: isFlipped ? 180 : 0, width: isFlipped ? "940px" : "580px", height: isFlipped ? "680px" : "72px" }}
            transition={{ duration: 0.9, type: "spring", stiffness: 50, damping: 20 }}
            className="preserve-3d flex items-center justify-center"
          >
            {/* FRONT FACE: AGENTIC OBSERVABILITY PAD */}
            <div className={cn(
              "vessel-face vessel-face-front flex items-center px-10 rounded-full relative transition-all duration-500",
              borderPulse ? "border-[#4fd1c5]/40" : ""
            )}>
              {/* [GHOST MODE]: Internal morphing substrate restored */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full opacity-[0.15]">
                <div className="flex items-center gap-4 px-10 h-full">
                  <span className="font-mono text-[11px] text-[#4fd1c5] blur-[1px] select-none whitespace-nowrap">
                    {AGENT_INTENTS[(sentenceIndex + 1) % AGENT_INTENTS.length]}
                  </span>
                  <span className="font-mono text-[11px] text-[#4fd1c5] blur-[2px] select-none whitespace-nowrap opacity-50">
                    {AGENT_INTENTS[(sentenceIndex + 2) % AGENT_INTENTS.length]}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full pointer-events-none z-30 border border-white/5" />

              {terminalState === 'DIRECT_STRIKE' ? (
                <div className="flex-1 z-10 flex items-center gap-3 justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#b7c8ff] animate-pulse shadow-[0_0_12px_#b7c8ff]" />
                  <span className="text-[#b7c8ff] text-[9px] uppercase tracking-[0.2em] font-black" style={{ fontFamily: 'var(--font-microgramma)', textShadow: '0 0 12px rgba(183,200,255,0.8)' }}>AWAITING AGENT PAYLOAD...</span>
                </div>
              ) : (
                <>
                  {/* ASCII MORPH: Left-side phase glyph */}
                  <div className="shrink-0 mr-4 z-10 w-[26px] flex items-center justify-center">
                    {isProcessing ? <Loader2 size={20} className="text-[#b7c8ff] animate-spin" /> : renderMorphGlyph()}
                  </div>
                  <input
                    id="agent-intent-input"
                    aria-label="Agent Intent"
                    type="text" value={intent} onChange={(e) => setIntent(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInitiateCycle()}
                    placeholder={getPlaceholder()}
                    className={cn("flex-1 bg-transparent border-none text-[15px] font-bubbly placeholder:text-[#b7c8ff]/20 outline-none z-10 relative appearance-none shadow-none",
                      (sentenceIndex === 2 || sentenceIndex === 3) && terminalState === 'TEST_FLIGHT' ? "text-[#b7c8ff]" : "text-[#b7c8ff]/80"
                    )}
                    style={{ 
                      fontFamily: 'var(--font-bubbly)',
                      background: 'none',
                      textShadow: (sentenceIndex === 2 || sentenceIndex === 3) && terminalState === 'TEST_FLIGHT' 
                        ? '0 0 12px rgba(183,200,255,0.7), 0 0 4px rgba(183,200,255,0.3)' 
                        : 'none' 
                    }}
                    disabled={isProcessing || isFlipped}
                  />
                  <div className={cn("ml-3 z-10 shrink-0 cursor-pointer transition-transform active:scale-90", (isProcessing || isFlipped) && "opacity-50 pointer-events-none")} onClick={handleInitiateCycle} />
                </>
              )}
            </div>

            {/* BACK FACE */}
            <div className="vessel-face vessel-face-back overflow-hidden rounded-[3rem] shadow-2xl bg-black/80 backdrop-blur-3xl border border-white/10">
              {isFlipped && <ActionGateModal />}
            </div>
          </motion.div>

          {/* SWITCH GEARS */}
          <AnimatePresence>
            {!isFlipped && (
              <motion.div className="flex items-center justify-center gap-3 z-50 pointer-events-auto" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <div className="flex items-center justify-center cursor-pointer transition-all duration-300 px-5 py-2.5 rounded-full border bg-[#b7c8ff]/10 border-[#b7c8ff]/30 shadow-[0_0_15px_rgba(183,200,255,0.1)] hover:bg-[#b7c8ff]/20" onClick={() => handleStateSwitch('TEST_FLIGHT')}>
                  <span className="uppercase tracking-[0.1em] text-[9px] text-center block leading-none" style={{ fontFamily: 'var(--font-microgramma), sans-serif', fontWeight: 900, color: '#b7c8ff', filter: 'drop-shadow(0 0 8px rgba(183, 200, 255, 0.8))' }}>Request a Demo</span>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="flex items-center justify-center cursor-pointer transition-all duration-300 px-5 py-2.5 rounded-full border bg-[#b7c8ff]/10 border-[#b7c8ff]/30 shadow-[0_0_15px_rgba(183,200,255,0.1)] hover:bg-[#b7c8ff]/20" onClick={() => setShowAuthModal(true)}>
                    <span className="uppercase tracking-[0.1em] text-[9px] text-center block leading-none" style={{ fontFamily: 'var(--font-microgramma), sans-serif', fontWeight: 900, color: '#b7c8ff', filter: 'drop-shadow(0 0 8px rgba(183, 200, 255, 0.8))' }}>Authorize Agent</span>
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
