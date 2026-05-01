"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Zap, Cpu, Shield, Globe } from 'lucide-react';
import { useKineticStore } from '../store/useKineticStore';
import { HyperspaceEffect } from './ui/HyperspaceEffect';

/* ─── Visual Constants ─── */
const ACCENT = "#b7c8ff";
const ACCENT_DIM = "rgba(183, 200, 255, 0.1)";
const BODY_COLOR = "rgba(184, 216, 249, 0.8)";
const ERR = "#ff6b6b";
const OK = "#4fd1c5";
const WARN = "#fbbf24";
const LEGACY_GREY = "#94a3b8";
const CRYSTAL_BLUE = "#b8d8f9";

/* ─── IDE Script Definitions ─── */
type ScriptLine = {
  text: string;
  color?: string;
  prefix?: string;
  prefixColor?: string;
  delay?: number;
  typing?: boolean;
};

type ContrastRow = {
  leftLabel: string;
  leftDesc: string;
  rightLabel: string;
  rightDesc: string;
};

const SCRIPTS: Record<string, ScriptLine[]> = {
  "01": [
    { prefix: "AGENT", prefixColor: ACCENT, text: '"Rotate $3.2M treasury into', typing: true, delay: 900 },
    { prefix: "      ", prefixColor: ACCENT, text: ' SOL-USDC LP across 3 venues"', typing: true, delay: 400 },
    { text: "", delay: 500 },
    { prefix: "  TX", prefixColor: WARN, text: "Signing with agent hot wallet...", delay: 1000 },
    { prefix: "  TX", prefixColor: WARN, text: "Broadcasting to public mempool...", delay: 900 },
    { prefix: "  TX", prefixColor: WARN, text: "Intent visible: 0x7f3a...e9c1", delay: 700 },
    { text: "", delay: 500 },
    { prefix: "  ✗", prefixColor: ERR, text: "FRONT-RUN DETECTED", color: ERR, delay: 1000 },
    { prefix: "   ", prefixColor: ERR, text: "Searcher extracted $47,200 from slippage", color: `${ERR}99`, delay: 600 },
    { text: "", delay: 400 },
    { prefix: "  ✗", prefixColor: ERR, text: "Private key exposed in agent runtime", color: ERR, delay: 900 },
    { prefix: "  ✗", prefixColor: ERR, text: "TOTAL EXPOSURE: $3.2M — CRITICAL", color: ERR, delay: 700 },
    { prefix: "  ✗", prefixColor: ERR, text: "Key exfiltrated. Vault drained.", color: ERR, delay: 1000 },
  ],
  "02": [
    { prefix: "INGRESS", prefixColor: OK, text: "Deterministic JSON intent received", delay: 700 },
    { prefix: "AUTH", prefixColor: OK, text: "Requesting Near MPC signature...", delay: 600 },
    { prefix: "AUTH", prefixColor: OK, text: "Mode: Keyless Threshold Auth", delay: 500 },
    { prefix: "  ✓", prefixColor: OK, text: "Signature Secured: ed25519:5H9b...", color: OK, delay: 900 },
    { text: "", delay: 500 },
    { prefix: "SOCKET", prefixColor: OK, text: "Validating Institutional Schema:", delay: 800 },
    { text: '  { "action": "SWAP", "amount": 10M,', color: `${ACCENT}CC`, delay: 300 },
    { text: '    "slippage": 10bps, "pda": true }', color: `${ACCENT}CC`, delay: 250 },
    { text: "", delay: 500 },
    { prefix: "  ✓", prefixColor: OK, text: "Telemetry Finalized (0.02s)", color: OK, delay: 700 },
    { prefix: "  ✓", prefixColor: OK, text: "[INGRESS_VERIFIED] State: Keyless_Auth_Secured", color: OK, delay: 800 },
  ],
  "03": [
    { prefix: "PIPELINE", prefixColor: WARN, text: "2-Stage Shipping Architecture Active", delay: 800 },
    { prefix: "AUTH", prefixColor: OK, text: "Near MPC Threshold Signature Verified", delay: 600 },
    { prefix: "  ✓", prefixColor: OK, text: "Keyless Ed25519 Auth Secured", color: OK, delay: 500 },
    { text: "", delay: 600 },
    { prefix: "DELEGATE", prefixColor: ACCENT, text: "PDA budget authority granted to agent", delay: 900 },
    { prefix: "  ✓", prefixColor: OK, text: "Budget Delegation Locked (0.05s)", color: OK, delay: 800 },
    { prefix: "  ✓", prefixColor: OK, text: "[SENTINEL_CLEARED] Budget: Within_Ceiling | State: Compliant", color: OK, delay: 800 },
  ],
  "04": [
    { prefix: "STRIKE", prefixColor: OK, text: "Compiling Jito Atomic Bundle...", delay: 900 },
    { prefix: "STRIKE", prefixColor: OK, text: "Injecting Pyth Oracle check...", delay: 800 },
    { prefix: "STRIKE", prefixColor: OK, text: "Bypassing public mempool...", delay: 600 },
    { text: "", delay: 500 },
    { prefix: "JITO", prefixColor: OK, text: "Submitting to Block Engine (ams)", delay: 700 },
    { prefix: "  ✓", prefixColor: OK, text: "SETTLED in 400ms (1 Block)", color: OK, delay: 1000 },
    { prefix: "  TX", prefixColor: `${OK}80`, text: "5Kp9...mXn2", color: `${OK}60`, delay: 500 },
    { prefix: "  ✓", prefixColor: OK, text: "[SETTLEMENT_FINALIZED] Latency: 400ms | Slippage: 0bps", color: OK, delay: 600 },
    { prefix: "  ✓", prefixColor: OK, text: "MEV_CAPTURED: +34bps returned to operator", color: OK, delay: 700 },
  ],
};

/* ─── ASCII Morph Sets (per-script state indicators, derived from VesselTerminal DNA) ─── */
const SCRIPT_MORPHS: Record<string, { g: string[]; s: number; c: string }> = {
  "01": { g: ['/', '-', '\\', '|'], s: 60, c: LEGACY_GREY },    // rotating slash — legacy state
  "02": { g: ['○', '◎', '◉', '●', '◉', '◎'], s: 160, c: OK },  // circles crystallizing — MPC handshake
  "03": { g: ['◇', '◈', '◆', '◈', '◇'], s: 200, c: OK },        // diamond lock — PDA auth
  "04": { g: ['▲', '▶', '▼', '◀'], s: 100, c: OK },             // rotating arrows — bundle kinetics
};

/* ─── Contrast Card ─── */
const ContrastCard = ({ rows }: { rows: ContrastRow[] }) => (
  <div className="w-full overflow-hidden rounded-xl" style={{
    border: '1px solid rgba(183, 200, 255, 0.12)',
    background: 'linear-gradient(165deg, rgba(183, 200, 255, 0.03), rgba(2, 6, 23, 0.5))',
  }}>
    <div className="grid grid-cols-2">
      <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(148, 163, 184, 0.1)', borderRight: '1px solid rgba(183, 200, 255, 0.08)', borderBottom: '1px solid rgba(183, 200, 255, 0.08)' }}>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-microgramma), sans-serif', color: LEGACY_GREY }}>LEGACY WEB 3</span>
      </div>
      <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(184, 216, 249, 0.1)', borderBottom: '1px solid rgba(183, 200, 255, 0.08)' }}>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-microgramma), sans-serif', color: CRYSTAL_BLUE, textShadow: `0 0 12px ${CRYSTAL_BLUE}80` }}>SPACEDECK</span>
      </div>
    </div>
    {rows.map((row, i) => (
      <div key={i} className="grid grid-cols-2" style={{ borderTop: i > 0 ? '1px solid rgba(183, 200, 255, 0.06)' : undefined }}>
        <div className="px-5 py-4" style={{ background: 'rgba(148, 163, 184, 0.04)', borderRight: '1px solid rgba(183, 200, 255, 0.08)' }}>
          <div className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1.5 font-questrial" style={{ color: LEGACY_GREY }}>{row.leftLabel}</div>
          <div className="text-[14px] font-questrial leading-[1.6] tracking-[0.02em]" style={{ color: LEGACY_GREY }}>{row.leftDesc}</div>
        </div>
        <div className="px-5 py-4" style={{ background: 'rgba(184, 216, 249, 0.04)' }}>
          <div className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1.5 font-questrial" style={{ color: CRYSTAL_BLUE, textShadow: `0 0 10px ${CRYSTAL_BLUE}40` }}>{row.rightLabel}</div>
          <div className="text-[14px] font-questrial leading-[1.6] tracking-[0.02em]" style={{ color: CRYSTAL_BLUE }}>{row.rightDesc}</div>
        </div>
      </div>
    ))}
  </div>
);

/* ─── Stat Card With Tooltip ─── */
const StatCardWithTooltip = ({ value, label, tooltip }: { value: string; label: string; tooltip?: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sis-panel p-6 flex flex-col items-center justify-center text-center relative cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="sis-stat-value mb-2">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.05em] font-medium font-questrial" style={{ color: `${ACCENT}80` }}>{label}</div>
      <AnimatePresence>
        {hovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ top: 'calc(100% + 10px)', width: '230px' }}
          >
            <div className="rounded-lg px-4 py-3 text-[10px] leading-[1.65] font-mono text-left relative" style={{
              background: 'linear-gradient(165deg, rgba(183, 200, 255, 0.14), rgba(2, 6, 23, 0.95))',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(183, 200, 255, 0.22)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(183,200,255,0.05)',
              color: `${ACCENT}CC`,
            }}>
              <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45" style={{ background: 'rgba(183, 200, 255, 0.14)', borderTop: '1px solid rgba(183,200,255,0.22)', borderLeft: '1px solid rgba(183,200,255,0.22)' }} />
              {tooltip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Static Glitch Line ─── */
const GlitchLine = ({ line }: { line: ScriptLine }) => {
  const [displayText, setDisplayText] = useState(line.text);

  useEffect(() => {
    if (!line.text) return;

    const interval = setInterval(() => {
      // 20% chance to glitch a character periodically
      if (Math.random() < 0.20) {
        const chars = line.text.split('');
        const numGlitches = Math.floor(Math.random() * 2) + 1; // 1 or 2 chars
        
        for (let i = 0; i < numGlitches; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          // Only glitch alphanumeric to preserve spaces/formatting
          if (/[a-zA-Z0-9]/.test(chars[idx])) {
            chars[idx] = Math.random() > 0.5 ? '0' : '1';
          }
        }
        
        setDisplayText(chars.join(''));
        
        // Revert quickly
        setTimeout(() => {
          setDisplayText(line.text);
        }, 50 + Math.random() * 100);
      }
    }, 500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [line.text]);

  return (
    <div className="flex items-start gap-0 leading-[1.7] min-h-[1.4em]">
      {line.prefix && (
        <span
          className="font-questrial text-[11px] font-bold shrink-0 w-[62px] text-right mr-2 select-none"
          style={{
            color: line.prefixColor || ACCENT,
            opacity: 0.9,
            letterSpacing: '0.04em',
            textShadow: `0 0 10px ${line.prefixColor || ACCENT}50`,
          }}
        >
          {line.prefix}
        </span>
      )}
      {!line.prefix && <span className="w-[70px] shrink-0" />}
      <span
        className="font-questrial text-[12px]"
        style={{
          color: line.color || `${ACCENT}99`,
          letterSpacing: '0.02em',
          textShadow: `0 0 8px ${line.color || ACCENT}35`,
        }}
      >
        {displayText}
      </span>
    </div>
  );
};

/* ─── IDE Stream Component ─── */
const IDEStream = ({ scriptKey }: { scriptKey: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [morphGlyph, setMorphGlyph] = useState('');
  const script = SCRIPTS[scriptKey] || [];
  const morph = SCRIPT_MORPHS[scriptKey];
  const morphRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isInView && morph) {
      let i = 0;
      setMorphGlyph(morph.g[0]);
      morphRef.current = setInterval(() => {
        i++;
        setMorphGlyph(morph.g[i % morph.g.length]);
      }, morph.s);
    } else {
      if (morphRef.current) clearInterval(morphRef.current);
      setMorphGlyph('');
    }
    return () => { if (morphRef.current) clearInterval(morphRef.current); };
  }, [isInView, morph]);

  return (
    <div ref={ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-4 pointer-events-none">
      <motion.div
        className="w-full max-w-[480px] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Script Content Area — Floating Minimalism */}
        <div className="relative z-10 space-y-0.5">
          {/* ASCII Morph at the very top */}
          {morphGlyph && (
            <div className="mb-4 ml-[70px] flex items-center gap-3">
              <span
                className="font-mono text-[16px] transition-all duration-100 inline-block w-[20px] text-center"
                style={{ 
                  color: scriptKey === '01' ? LEGACY_GREY : "#b8d8f9", 
                  textShadow: scriptKey === '01' ? 'none' : '0 0 15px rgba(184, 216, 249, 0.6)', 
                  opacity: 0.9 
                }}
              >
                {morphGlyph}
              </span>
              <span 
                className="font-microgramma text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap" 
                style={{ 
                  color: scriptKey === '01' ? LEGACY_GREY : "#b8d8f9",
                  textShadow: scriptKey === '01' ? 'none' : '0 0 15px rgba(184, 216, 249, 0.6)'
                }}
              >
                {scriptKey === '01' ? "LEGACY WEB 3" : "SPACEDECK"}
              </span>
            </div>
          )}

          {script.map((line, idx) => (
            <GlitchLine key={`${scriptKey}-${idx}`} line={line} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};


/* ─── Stat Card (Hero) ─── */
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="sis-panel p-6 flex flex-col items-center justify-center text-center">
    <div className="sis-stat-value mb-2">{value}</div>
    <div className="text-[10px] uppercase tracking-[0.05em] font-medium font-questrial" style={{ color: `${ACCENT}80` }}>{label}</div>
  </div>
);

/* ─── Cymatic Visual (Floating Log) ─── */
const CymaticVisual = ({ src, scriptKey }: { src: string; scriptKey: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* IDE Stream Overlay — No backgrounds, no containers */}
      <IDEStream scriptKey={scriptKey} />
    </motion.div>
  );
};

/* ─── Section Block ─── */
const SectionBlock = ({
  number,
  title,
  icon: Icon,
  children,
  id,
  stats,
  contrastRows,
  videoSrc,
  reverse = false,
}: {
  number: string;
  title: string;
  icon: any;
  children: React.ReactNode;
  id?: string;
  stats?: Array<{ value: string; label: string }>;
  contrastRows?: ContrastRow[];
  videoSrc?: string;
  reverse?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const cardContent = (
    <div className="space-y-8 flex-1 min-w-0">
      <div className="flex items-center gap-4">
        <div className="sis-step-label">
          <Icon size={24} style={{ color: ACCENT }} />
          <span className="leading-none">{number}</span>
        </div>
        <div className="w-px h-4" style={{ backgroundColor: `${ACCENT}33` }} />
        <h2 className="sis-step-title">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
      {contrastRows && contrastRows.length > 0 && (
        <ContrastCard rows={contrastRows} />
      )}
      {!contrastRows && stats && stats.length > 0 && (
        <div className={`grid gap-3 ${stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {stats.map((s, i) => (
            <div key={i} className="p-4 rounded-xl flex flex-col" style={{ backgroundColor: "rgba(183, 200, 255, 0.02)", border: `1px solid ${ACCENT_DIM}` }}>
              <div className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: `${ACCENT}4D` }}>{s.label}</div>
              <div className="text-[13px] font-medium font-questrial tracking-wide" style={{ color: BODY_COLOR }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const videoContent = videoSrc ? (
    <div className="flex-1 min-w-0 flex items-center">
      <CymaticVisual src={videoSrc} scriptKey={number} />
    </div>
  ) : null;

  return (
    <motion.div
      ref={ref}
      id={id}
      className="scroll-mt-32"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {videoSrc ? (
        <div className={`flex flex-col lg:flex-row gap-6 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {cardContent}
          {videoContent}
        </div>
      ) : (
        cardContent
      )}
    </motion.div>
  );
};

/* ─── Authorize Agent CTA ─── */
const AuthorizeAgentCTA = () => {
  const setShowAuthModal = useKineticStore((state) => state.setShowAuthModal);
  return (
    <button onClick={() => setShowAuthModal(true)} className="sis-cta-secondary">
      Authorize Agent <span className="text-[12px]">→</span>
    </button>
  );
};

/* ─── Integration Specs CTA ─── */
const IntegrationSpecsCTA = () => {
  const setAgentMode = useKineticStore((state) => state.setAgentMode);
  return (
    <button 
      onClick={() => {
        setAgentMode(true);
        setTimeout(() => {
          const el = document.getElementById('agent-instructions-container');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }} 
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#b7c8ff]/40 text-[#b7c8ff] hover:bg-[#b7c8ff]/10 hover:border-[#b7c8ff]/80 hover:shadow-[0_0_35px_rgba(183,200,255,0.4)] transition-all duration-300"
      style={{
        fontFamily: 'var(--font-questrial), sans-serif',
        boxShadow: '0 0 25px rgba(183,200,255,0.25), inset 0 0 12px rgba(183,200,255,0.1)'
      }}
    >
      <span className="font-medium text-[15px] tracking-[0.05em]">Pull Pipeline Specs</span>
      <span className="text-[12px] opacity-80 mt-[2px]">🡭</span>
    </button>
  );
};

/* ─── Main Component ─── */
export const ScienceManifestSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="science-manifest"
      className="relative w-full overflow-hidden text-white scroll-mt-20"
      style={{ backgroundColor: "var(--background, #020617)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-[160px] pb-40">

        {/* ═══ HERO ═══ */}
        <motion.div
          className="mb-14 w-full flex flex-col items-center mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="mb-6"
            style={{
              fontFamily: 'var(--font-questrial), sans-serif',
              fontSize: '14px',
              letterSpacing: '0.12em',
              color: `${ACCENT}80`,
              textShadow: `0 0 20px ${ACCENT}30`,
              textTransform: 'uppercase'
            }}
          >
            The keyless execution layer for autonomous agents on Solana
          </div>
          <h1
            className="mb-8 text-white uppercase italic leading-[0.85] text-center"
            style={{
              fontFamily: 'var(--font-microgramma), sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7.5vw, 5.25rem)',
              letterSpacing: '-0.02em',
            }}
          >
            THE SCIENCE OF<br />SPACE-BOUND<br />CAPITAL
          </h1>
          <div className="font-microgramma tracking-[0.4em] text-[10px] mb-10 uppercase font-bold" style={{ color: ACCENT }}>
            Spacedeck Protocol
          </div>
          <p className="sis-body max-w-2xl mx-auto mb-10">
            Every AI agent on-chain today holds a private key it shouldn&apos;t have and broadcasts through a mempool it can&apos;t survive. Spacedeck resolves this friction by providing bespoke, zero-custody execution rails—allowing you to deploy proprietary math while we protect the algorithmic settlement.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('manifest-gravity');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="sis-cta-primary"
            >
              See how it works <span className="text-[12px]">↓</span>
            </button>
            <IntegrationSpecsCTA />
          </div>
        </motion.div>

        {/* ═══ HERO STATS ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-20 max-w-[900px] mx-auto">
          <StatCardWithTooltip value="KEYLESS" label="Agent Execution" tooltip="Near MPC threshold signatures. No hot wallet. No custody liability." />
          <StatCardWithTooltip value="+70bps" label="Targeted Alpha" tooltip="Net operator advantage vs. naive mempool execution." />
          <StatCardWithTooltip value="400ms" label="Settlement Finality" tooltip="Single-block Jito bundle. Atomic. Mempool-bypassed. Zero revert risk." />
        </div>

        {/* ═══ SECTIONS ═══ */}
        <div className="space-y-8">
          <SectionBlock
            id="manifest-gravity"
            number="01"
            title="Zero-Custody Architecture"
            icon={Zap}
            videoSrc="/cymatics/cymatic-01.mp4"
            contrastRows={[
              { leftLabel: "Key Custody", leftDesc: "Hot wallet. Total loss on exploit.", rightLabel: "Keyless Auth", rightDesc: "Near MPC. Zero key exposure." },
              { leftLabel: "Public Mempool", leftDesc: "Visible intent. 30-80bps extracted.", rightLabel: "Jito Bundle", rightDesc: "Sealed. Mempool-bypassed. 0% loss." },
            ]}
          >
            <p className="sis-body text-[17px]">
              The agent holds a key. The key gets stolen. The mempool leaks the intent. The searcher extracts the value. This isn&apos;t a risk profile — it&apos;s a structural impossibility.
            </p>
          </SectionBlock>

          <SectionBlock
            id="manifest-prism"
            number="02"
            title="Cryptographic Ingress"
            icon={Cpu}
            videoSrc="/cymatics/cymatic-02.mp4"
            reverse
            contrastRows={[
              { leftLabel: "Auth Model", leftDesc: "Hot keys. Deployed to runtime.", rightLabel: "Auth Model", rightDesc: "Near MPC. Keyless. 50ms." },
              { leftLabel: "Intent Format", leftDesc: "Probabilistic. Ambiguous.", rightLabel: "Intent Format", rightDesc: "Typed JSON. Deterministic." },
            ]}
          >
            <p className="sis-body text-[17px]">
              The agent emits a strictly typed JSON intent. Spacedeck authenticates it via Near MPC — keyless, off-chain, in 50ms. No key leaves the vault. No intent is ambiguous.
            </p>
          </SectionBlock>

          <SectionBlock
            id="manifest-compliance"
            number="03"
            title="The Clearing Enclave"
            icon={Shield}
            videoSrc="/cymatics/cymatic-03.mp4"
            contrastRows={[
              { leftLabel: "Budget Control", leftDesc: "Unlimited access. Manual revocation.", rightLabel: "Budget Control", rightDesc: "PDA Delegation. Non-exceedable." },
              { leftLabel: "Compliance", leftDesc: "Post-trade audit. Too late.", rightLabel: "Compliance", rightDesc: "Pre-flight check. Zero-leakage." },
            ]}
          >
            <p className="sis-body text-[17px]">
              The human sets the ceiling. The agent executes within it. Every intent is compliance-checked before settlement — slippage bounds, budget limits, blacklisted addresses. Violations are rejected, not audited after the fact.
            </p>
          </SectionBlock>

          <SectionBlock
            id="manifest-settlement"
            number="04"
            title="Atomic Settlement"
            icon={Globe}
            videoSrc="/cymatics/cymatic-01.mp4"
            reverse
            contrastRows={[
              { leftLabel: "Mempool", leftDesc: "Public. Front-run. 30-80bps loss.", rightLabel: "Jito Bundle", rightDesc: "Private. Sealed. 0% loss." },
              { leftLabel: "Net Cost", leftDesc: "30-80bps lost (invisible).", rightLabel: "Net Advantage", rightDesc: "+20 to +70bps saved per trade." },
            ]}
          >
            <p className="sis-body text-[17px]">
              One sealed Jito bundle. 400ms. Zero mempool exposure. If slippage exceeds your bounds, the trade reverts — no partial fills, no capital at risk. The 10 BPS Siphon Fee is our cut of the alpha we save you.
            </p>
          </SectionBlock>
        </div>

        {/* ═══ FOOTER CTA — DUAL VOICE ═══ */}
        <div className="mt-24 pt-10 border-t max-w-[800px] mx-auto" style={{ borderColor: `${ACCENT}1A` }}>

          {/* UNIFIED FINAL STRIKE */}
          <div className="text-center pt-20 pb-40">
            <div 
              className="text-white uppercase italic leading-[0.85] text-center mb-6"
              style={{
                fontFamily: 'var(--font-microgramma), sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                letterSpacing: '-0.02em',
              }}
            >
              SHIP FASTER. EXECUTE SAFER.
            </div>
            <p className="sis-body text-[17px] mb-10 max-w-xl mx-auto">
              One endpoint. Typed JSON schema. Keyless auth + atomic settlement. 
              Integrate in 15 minutes. Set your ceiling, authorize your agent, and observe the alpha.
            </p>
            <IntegrationSpecsCTA />
          </div>

        </div>

      </div>
    </section>
  );
};
