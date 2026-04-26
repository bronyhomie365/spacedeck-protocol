"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Cpu, Shield, Globe } from 'lucide-react';

/* ─── Visual Constants ─── */
const ACCENT = "#b7c8ff";
const ACCENT_DIM = "rgba(183, 200, 255, 0.1)";
const BODY_COLOR = "rgba(184, 216, 249, 0.8)";
const ERR = "#ff6b6b";
const OK = "#4fd1c5";
const WARN = "#fbbf24";

/* ─── IDE Script Definitions ─── */
type ScriptLine = {
  text: string;
  color?: string;
  prefix?: string;
  prefixColor?: string;
  delay?: number; // ms before this line appears
  typing?: boolean; // typewriter effect
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
  ],
  "03": [
    { prefix: "VACUUM", prefixColor: WARN, text: "Sealing Clearing Enclave (Arcium)", delay: 800 },
    { prefix: "VACUUM", prefixColor: WARN, text: "Broadcasting to 65 bonded solvers...", delay: 600 },
    { prefix: "  BID", prefixColor: `${ACCENT}80`, text: "Solver_17 → 0.02% slippage", delay: 500 },
    { prefix: "  BID", prefixColor: `${ACCENT}80`, text: "Solver_42 → 0.01% slippage", delay: 400 },
    { prefix: "  ★", prefixColor: OK, text: "WINNER: Solver_42", color: OK, delay: 900 },
    { text: "", delay: 600 },
    { prefix: "DELEGATE", prefixColor: ACCENT, text: "PDA authority granted to Enclave", delay: 900 },
    { prefix: "  ✓", prefixColor: OK, text: "Vacuum Auction Locked (0.05s)", color: OK, delay: 800 },
  ],
  "04": [
    { prefix: "STRIKE", prefixColor: OK, text: "Compiling Jito Atomic Bundle...", delay: 900 },
    { prefix: "STRIKE", prefixColor: OK, text: "Injecting Pyth Oracle check...", delay: 800 },
    { prefix: "STRIKE", prefixColor: OK, text: "Bypassing public mempool...", delay: 600 },
    { text: "", delay: 500 },
    { prefix: "JITO", prefixColor: OK, text: "Submitting to Block Engine (ams)", delay: 700 },
    { prefix: "  ✓", prefixColor: OK, text: "SETTLED in 400ms (1 Block)", color: OK, delay: 1000 },
    { prefix: "  TX", prefixColor: `${OK}80`, text: "5Kp9...mXn2", color: `${OK}60`, delay: 500 },
  ],
};

/* ─── Typewriter Hook ─── */
const useTypewriter = (text: string, speed: number, active: boolean) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, active]);
  return displayed;
};

/* ─── Single Animated Line ─── */
const AnimatedLine = ({ line, active }: { line: ScriptLine; active: boolean }) => {
  const typed = useTypewriter(line.text, 45, active && !!line.typing);
  const displayText = line.typing ? typed : (active ? line.text : "");

  if (!active) return null;

  return (
    <div className="flex items-start gap-0 leading-[1.7] min-h-[1.4em]">
      {line.prefix && (
        <span
          className="font-mono text-[10px] font-bold shrink-0 w-[62px] text-right mr-2 select-none"
          style={{
            color: line.prefixColor || ACCENT,
            opacity: 0.9,
            textShadow: `0 0 8px ${line.prefixColor || ACCENT}40`,
          }}
        >
          {line.prefix}
        </span>
      )}
      {!line.prefix && <span className="w-[70px] shrink-0" />}
      <span
        className="font-mono text-[11px]"
        style={{
          color: line.color || `${ACCENT}99`,
          textShadow: `0 0 6px ${line.color || ACCENT}30`,
        }}
      >
        {displayText}
        {line.typing && typed.length < line.text.length && (
          <span className="animate-pulse" style={{ color: ACCENT, textShadow: `0 0 12px ${ACCENT}` }}>▎</span>
        )}
      </span>
    </div>
  );
};

/* ─── IDE Stream Component ─── */
const IDEStream = ({ scriptKey }: { scriptKey: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [visibleLines, setVisibleLines] = useState(0);
  const script = SCRIPTS[scriptKey] || [];
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runScript = useCallback(() => {
    // Clear previous timeouts
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    setVisibleLines(0);

    let cumulative = 800; // initial delay
    script.forEach((line, idx) => {
      cumulative += (line.delay || 300);
      const t = setTimeout(() => {
        setVisibleLines(idx + 1);
      }, cumulative);
      timeoutsRef.current.push(t);
    });

    // Loop: reset after all lines shown + pause
    const totalDuration = cumulative + 3000;
    const loopTimeout = setTimeout(() => {
      if (isInView) runScript();
    }, totalDuration);
    timeoutsRef.current.push(loopTimeout);
  }, [script, isInView]);

  useEffect(() => {
    if (isInView) {
      runScript();
    } else {
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];
      setVisibleLines(0);
    }

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isInView, runScript]);

  return (
    <div ref={ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-6 pointer-events-none">
      {/* ─── TERMINAL CONTAINER: Growing Geometry ─── */}
      <motion.div
        className="w-full max-w-[460px] rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, rgba(183, 200, 255, 0.08), rgba(2, 6, 23, 0.6))',
          backdropFilter: 'blur(40px) saturate(2)',
          WebkitBackdropFilter: 'blur(40px) saturate(2)',
          border: '1px solid rgba(183, 200, 255, 0.2)',
          boxShadow: '0 0 80px rgba(183, 200, 255, 0.08), 0 30px 60px -12px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(183, 200, 255, 0.15)',
        }}
        initial={{ height: 32, opacity: 0 }}
        animate={{ 
          height: visibleLines > 0 ? "auto" : 32,
          opacity: 1 
        }}
        transition={{ 
          height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4 }
        }}
      >
        {/* Terminal Header/Tab */}
        <div className="flex items-center justify-between px-4 h-8 border-b border-[#b7c8ff]/10" style={{ backgroundColor: 'rgba(183, 200, 255, 0.05)' }}>
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-[#b7c8ff]/20 shadow-[0_0_5px_rgba(183,200,255,0.1)]" />
            <div className="w-2 h-2 rounded-full bg-[#b7c8ff]/20 shadow-[0_0_5px_rgba(183,200,255,0.1)]" />
            <div className="w-2 h-2 rounded-full bg-[#b7c8ff]/20 shadow-[0_0_5px_rgba(183,200,255,0.1)]" />
          </div>
          <div 
            className="text-[8px] uppercase tracking-[0.25em] font-bold font-microgramma"
            style={{ color: `${ACCENT}60`, textShadow: `0 0 10px ${ACCENT}30` }}
          >
            {scriptKey === '01' ? '... Legacy Web3' : '... Spacedeck'}
          </div>
        </div>

        {/* Script Content Area */}
        <div className="px-5 py-4 space-y-0.5">
          {script.map((line, idx) => (
            <AnimatedLine key={`${scriptKey}-${idx}`} line={line} active={idx < visibleLines} />
          ))}
          {/* Subtle Scanline Overlay for texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-20 pointer-events-none opacity-[0.03]" style={{ backgroundSize: '100% 2px, 3px 100%' }} />
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

/* ─── Cymatic Visual (Lightweight glow + IDE overlay) ─── */
const CymaticVisual = ({ src, scriptKey }: { src: string; scriptKey: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full aspect-[4/3] overflow-hidden"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 98% 96% at 50% 50%, black 92%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 98% 96% at 50% 50%, black 92%, transparent 100%)',
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Deep void */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Static lilac glow blob — pops the glassmorphism */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 55% 45% at 50% 48%, rgba(183, 200, 255, 0.1) 0%, transparent 70%)',
      }} />

      {/* IDE Stream Overlay */}
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
  videoSrc,
  reverse = false,
}: {
  number: string;
  title: string;
  icon: any;
  children: React.ReactNode;
  id?: string;
  stats?: Array<{ value: string; label: string }>;
  videoSrc?: string;
  reverse?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const cardContent = (
    <div className="sis-panel p-7 space-y-6 flex-1 min-w-0">
      <div className="flex items-center gap-4">
        <div className="sis-step-label">
          <Icon size={16} style={{ color: ACCENT }} />
          <span className="leading-none">{number}</span>
        </div>
        <div className="w-px h-4" style={{ backgroundColor: `${ACCENT}33` }} />
        <h2 className="sis-step-title">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
      {stats && stats.length > 0 && (
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
        <div className={`flex flex-col lg:flex-row gap-6 items-stretch ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {cardContent}
          {videoContent}
        </div>
      ) : (
        cardContent
      )}
    </motion.div>
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
          <div className="font-microgramma tracking-[0.4em] text-[10px] mb-6 uppercase font-bold" style={{ color: ACCENT }}>
            Spacedeck Protocol
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
          <p className="sis-body max-w-2xl mx-auto mb-10">
            AI agents will manage more capital than humans within 36 months. Today, they can&apos;t safely hold a private key, survive MEV extraction, or pass a compliance check. Spacedeck fixes all three with a single integration.
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
            <a href="https://docs.spacedeck.xyz" target="_blank" rel="noopener noreferrer" className="sis-cta-secondary">
              Read the Docs <span className="text-[12px]">↗</span>
            </a>
          </div>
        </motion.div>

        {/* ═══ HERO STATS ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-20 max-w-[900px] mx-auto">
          <StatCard value="ZERO" label="Private Key Exposure" />
          <StatCard value="10" label="BPS Protocol Fee" />
          <StatCard value="400ms" label="Atomic Settlement" />
        </div>

        {/* ═══ SECTIONS ═══ */}
        <div className="space-y-8">
          <SectionBlock
            id="manifest-gravity"
            number="01"
            title="Why legacy execution fails"
            icon={Zap}
            videoSrc="/cymatics/cymatic-01.mp4"
            stats={[
              { label: "Key Risk", value: "Single point of failure in every agent wallet." },
              { label: "MEV Tax", value: "1-2% value loss per transaction in public mempools." }
            ]}
          >
            <p className="sis-body text-[14px]">
              Current DeFi infrastructure forces AI agents into a lethal trap. To move capital on-chain, your agent must hold private keys, broadcast through public mempools where institutional searchers front-run every move, and manage gas across fragmented chains. One jailbreak equals total loss. This is not a design limitation — it is a structural impossibility for autonomous scale.
            </p>
          </SectionBlock>

          <SectionBlock
            id="manifest-prism"
            number="02"
            title="Deterministic Intent"
            icon={Cpu}
            videoSrc="/cymatics/cymatic-02.mp4"
            reverse
            stats={[
              { label: "Input", value: "Strict JSON payload via MCP or REST API." },
              { label: "Auth", value: "Keyless Near MPC threshold signature." }
            ]}
          >
            <p className="sis-body text-[14px]">
              Eradicate probabilistic failure. Spacedeck converts institutional intent into a deterministic execution vector. By using Near MPC for keyless authentication, your agent signs transaction intents off-chain without ever touching the vault's private keys. The Spacedeck Socket validates the schema, verifies the signature, and triggers the Anchor PDA in under 50ms.
            </p>
          </SectionBlock>

          <SectionBlock
            id="manifest-compliance"
            number="03"
            title="Keyless. Shielded. Compliant."
            icon={Shield}
            videoSrc="/cymatics/cymatic-03.mp4"
            stats={[
              { label: "Security", value: "Zero key storage. Gasless budget revocation." },
              { label: "Compliance", value: "Pre-flight ZK sanctions screening on every intent." }
            ]}
          >
            <p className="sis-body text-[14px]">
              Spacedeck decouples budget authorization from execution. A human signs a gasless EIP-2612 Permit — a mathematical ceiling on how much capital the agent can deploy. The agent commands execution through a scoped API key. It never holds keys, never sees the vault, and never exceeds the budget. Every intent passes the Risk & Compliance Sentinel before reaching the solver network.
            </p>
          </SectionBlock>

          <SectionBlock
            id="manifest-settlement"
            number="04"
            title="Atomic Settlement"
            icon={Globe}
            videoSrc="/cymatics/cymatic-01.mp4"
            reverse
            stats={[
              { label: "Fee", value: "10 BPS surplus capture. Zero gas markup." },
              { label: "Finality", value: "400ms (Single-block strike via Jito)." },
              { label: "Security", value: "Zero-revert execution logic." }
            ]}
          >
            <p className="sis-body text-[14px]">
              Approved intents hit the Jito Block Engine for absolute finality. Spacedeck bypasses the public Solana mempool entirely, wrapping the execution, Pyth oracle price-check, and PDA authorization into a sealed bundle. This guarantees 400ms atomic settlement with 100% MEV protection. If the market violates your slippage bounds, the transaction reverts before a single cent is moved.
            </p>
          </SectionBlock>
        </div>

        {/* ═══ FOOTER CTA ═══ */}
        <div className="mt-24 pt-10 border-t max-w-[800px] mx-auto text-center" style={{ borderColor: `${ACCENT}1A` }}>
          <div className="font-microgramma text-sm font-bold uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
            SHIP FASTER. EXECUTE SAFER.
          </div>
          <p className="sis-body text-[14px] mb-8">
            Spacedeck is live on devnet. Integrate in under 15 minutes. Give your AI a treasury without giving it your keys.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://docs.spacedeck.xyz" target="_blank" rel="noopener noreferrer" className="sis-cta-primary">
              Explore the API <span className="text-[12px]">↗</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('science-manifest');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="sis-cta-secondary"
            >
              Back to top <span className="text-[12px]">↑</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
