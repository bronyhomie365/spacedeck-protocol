"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, ShieldCheck, Globe, Check, ArrowRight } from 'lucide-react';
import { useKineticStore } from '../store/useKineticStore';
import { cn } from './ui/primitives';

const StoryNode = ({ id, title, subtitle, content, icon: Icon, techSpecs = [], children }: any) => (
  <section id={id} className="py-24 border-b border-white/5 last:border-0 scroll-mt-32">
    <div className="flex flex-col md:flex-row gap-16">
      {/* Visual Identification */}
      <div className="md:w-1/3">
        <div className="sticky top-40 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#4fd1c5]/5 border border-[#4fd1c5]/20 flex items-center justify-center shadow-[0_0_30px_rgba(79,209,197,0.1)]">
            <Icon size={28} className="text-[#4fd1c5]" />
          </div>
          <div>
            <div className="text-[#4fd1c5] font-mono text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">NODE_STRIKE // {id.split('-')[1]?.toUpperCase()}</div>
            <h2 className="text-3xl font-bold text-white tracking-tight italic" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>{title}</h2>
            <p className="text-[#4fd1c5]/60 font-mono text-[10px] tracking-widest uppercase mt-4">{subtitle}</p>
          </div>
          
          <div className="pt-8 space-y-4">
            {techSpecs.map((spec: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1 font-bold">{spec.label}</div>
                <div className="text-white text-[12px] font-medium tracking-wide">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Analysis */}
      <div className="md:w-2/3 space-y-12">
        <p className="text-xl text-white/70 leading-relaxed font-light font-questrial tracking-wide">
          {content}
        </p>

        {children && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4fd1c5]/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000" />
            <div className="relative bg-[#020617]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
               {children}
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export const ExecutionPortal = ({ active }: { active: boolean }) => {
  const setTruthShard = useKineticStore((state) => state.setTruthShard);

  React.useEffect(() => {
    if (active) {
      setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          const el = document.getElementById(`node-${hash}`);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 100);
    }
  }, [active]);

  if (!active) return null;

  return (
    <motion.div 
      id="execution-portal-container"
      className="w-full max-w-[1200px] mx-auto pt-[160px] pb-60 px-10 text-left block relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* CINEMATIC ENTRANCE */}
      <div className="mb-32">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-[#4fd1c5] font-mono tracking-[0.5em] text-[11px] mb-8 uppercase font-bold">
            Protocol // The Science of Execution
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter leading-[0.9] italic" style={{ fontFamily: 'var(--font-questrial), sans-serif', fontWeight: 900 }}>
            COMMANDING THE <br /><span className="text-[#4fd1c5]">INTENTION ECONOMY.</span>
          </h1>
          <p className="text-2xl text-white/40 leading-relaxed max-w-3xl font-light tracking-wide">
            We have engineered the hull required to survive the Post-Web. From abstract intent to orbital finality, Spacedeck is the deterministic bridge for autonomous capital.
          </p>
        </motion.div>
      </div>

      <StoryNode 
        id="node-prism"
        icon={Cpu}
        title="The Prism Effect"
        subtitle="Neutralizing Imperative Chaos"
        content="The entry valve of the Spacedeck manifold. Our Heuristic Parser acts as the universal grammar between AI and Blockchain. It refracts chaotic natural language light into a rigid geometric Tetryon: The GoldenPayload."
        techSpecs={[
          { label: "Translation Vector", value: "Neural-to-Machine (N2M)" },
          { label: "Determinism", value: "0.00% Ambiguity Mapping" }
        ]}
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="text-[10px] font-mono text-[#4fd1c5] font-bold tracking-[0.3em]">INPUT_PROSE</div>
          <ArrowRight size={14} className="text-white/20" />
          <div className="text-[10px] font-mono text-[#4fd1c5] font-bold tracking-[0.3em]">GOLDEN_PAYLOAD_V1</div>
        </div>
        <div className="font-mono text-[12px] text-white/80 grid grid-cols-1 md:grid-cols-2 gap-8 italic">
          <div className="text-white/40">"I need to liquidate my 50% BONK position into USDC via TWAP over the next 4 hours."</div>
          <div className="bg-black/40 p-4 rounded-lg border border-white/5 not-italic text-[#4fd1c5]">
            "vector": "TWAP_LIQUIDITY_SINK",<br />
            "shards": 48,<br />
            "mass_protection": "STRICT"
          </div>
        </div>
      </StoryNode>

      <StoryNode 
        id="node-auction"
        icon={Zap}
        title="Marketplace Auction"
        subtitle="Dark-Pool Liquidity"
        content="Defeating mempool extraction at the source. Every intent is broadcast to a private network of bonded Institutional Solvers. We replace public front-running with a competitive auction house, ensuring optimal orbital finality."
        techSpecs={[
          { label: "Solver Latency", value: "50ms Strike Window" },
          { label: "Spread Capture", value: "10 BPS Alignment" }
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Wintermute', 'Jump', 'Spacedeck_Strike'].map((solver) => (
            <div key={solver} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 group hover:border-[#4fd1c5]/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-[10px] font-bold tracking-widest">{solver.toUpperCase()}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5] animate-pulse shadow-[0_0_8px_#4fd1c5]" />
              </div>
              <div className="text-white font-bold text-xl">12.8% <span className="text-[9px] font-mono opacity-30 tracking-widest">SURPLUS</span></div>
              <div className="text-[#4fd1c5]/20 font-mono text-[8px] uppercase tracking-widest">Signed_Bid_0x...</div>
            </div>
          ))}
        </div>
      </StoryNode>

      <StoryNode 
        id="node-compliance"
        icon={ShieldCheck}
        title="Compliance Guardian"
        subtitle="ZK-Sanctuary Shield"
        content="The Gevurah node physically gates every strike. We utilize Zero-Knowledge proofs to verify that capital origin is compliant with global standards without exposing user sovereignty. Toxicity is blocked at the airlock."
        techSpecs={[
          { label: "Pre-Flight Guard", value: "Real-time Sanctions Gate" },
          { label: "Integrity", value: "ZK-Verified Compliance" }
        ]}
      >
        <div className="p-6 rounded-xl bg-[#4fd1c5]/5 border border-[#4fd1c5]/20 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#4fd1c5]/10 border border-[#4fd1c5]/30">
                <Check size={20} className="text-[#4fd1c5]" />
              </div>
              <div>
                <div className="text-white font-bold font-mono text-[11px] tracking-widest uppercase mb-1">AUDIT_SUCCESS</div>
                <div className="text-[#4fd1c5]/60 font-mono text-[9px] tracking-widest uppercase">Verified // Risk: 0.00</div>
              </div>
           </div>
           <div className="text-[#4fd1c5]/20 font-mono text-[10px] uppercase">RES_ID // 0x71C...3e92</div>
        </div>
      </StoryNode>

      <StoryNode 
        id="node-settlement"
        icon={Globe}
        title="Settlement Engine"
        subtitle="Keyless Cross-Chain Finality"
        content="Closing the loop via NEAR MPC Threshold Signatures. Our Netzach node generates cross-chain strike vectors without hot-wallets, leveraging Arcium MXE to ensure metadata is cloaked from mempool predators."
        techSpecs={[
          { label: "Finality", value: "12s Average Cross-Chain" },
          { label: "Sovereignty", value: "Fully Decoupled Budget" }
        ]}
      >
        <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4fd1c5]/5 to-transparent animate-pulse" />
           <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="text-[#4fd1c5] font-mono text-[11px] font-bold tracking-[0.5em] uppercase">Broadcasting Strike...</div>
              <div className="flex items-center gap-12 w-full max-w-md justify-center">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 text-[10px] font-bold italic">ETH</div>
                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#4fd1c5] to-transparent relative">
                    <motion.div 
                      animate={{ x: [-20, 240] }} 
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 w-2 h-2 rounded-full bg-[#4fd1c5] shadow-[0_0_10px_#4fd1c5]"
                    />
                 </div>
                 <div className="w-12 h-12 rounded-full border border-[#4fd1c5]/30 flex items-center justify-center bg-[#4fd1c5]/5 text-[10px] font-bold italic">SOL</div>
              </div>
           </div>
        </div>
      </StoryNode>

      {/* FINAL EXIT SIGNATURE */}
      <div className="mt-48 text-center space-y-12">
        <div className="w-px h-32 bg-gradient-to-b from-[#4fd1c5]/40 to-transparent mx-auto" />
        <div className="max-w-2xl mx-auto space-y-8">
          <h3 className="text-white text-3xl font-bold tracking-tight italic" style={{ fontFamily: 'var(--font-questrial), sans-serif' }}>THE MISSION IS UNSTOPPABLE.</h3>
          <p className="text-xl text-white/40 leading-relaxed font-light italic">
            "We didn't build another bridge. We built a sanctuary vessel. The Agentic Economy requires speed, safety, and silence. Spacedeck provides all three."
          </p>
          <div className="pt-8">
            <button 
              onClick={() => {
                setTruthShard(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-12 py-4 rounded-full border border-[#4fd1c5]/30 bg-[#4fd1c5]/5 text-[#4fd1c5] font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#4fd1c5]/10 transition-all font-bold"
            >
              [ Return to Orbit ]
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};