"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Server, Binary, CheckCircle2 } from 'lucide-react';

const WaterfallStep = ({ 
  index,
  icon: Icon, 
  title, 
  description, 
  details, 
  side = 'left'
}: { 
  index: number,
  icon: any, 
  title: string, 
  description: string, 
  details: string[], 
  side?: 'left' | 'right'
}) => (
  <motion.div 
    className={`relative group flex flex-col md:flex-row gap-8 p-10 rounded-[2rem] border border-white/5 bg-[#0f172a]/40 backdrop-blur-3xl hover:border-[#4fd1c5]/20 transition-all duration-700 max-w-4xl mx-auto ${side === 'right' ? 'md:translate-x-12' : 'md:-translate-x-12'}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Rhythmic Step Number (Cymatics) */}
    <div className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center font-bubbly text-2xl text-[#4fd1c5] shadow-[0_0_20px_rgba(79,209,197,0.2)] group-hover:scale-110 transition-transform duration-500">
      {index + 1}
    </div>

    {/* Left Icon Rail */}
    <div className="flex flex-col items-center shrink-0">
      <div className="w-16 h-16 rounded-[1.2rem] bg-[#4fd1c5]/5 border border-[#4fd1c5]/20 flex items-center justify-center shadow-[inset_0_0_20px_rgba(79,209,197,0.05)] group-hover:shadow-[0_0_30px_rgba(79,209,197,0.1)] transition-all duration-700">
        <Icon size={28} className="text-[#4fd1c5]" />
      </div>
    </div>

    {/* Content (Tetryonics) */}
    <div className="flex-1 pt-1">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-microgramma text-xl text-white tracking-widest uppercase">{title}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-[#4fd1c5]/30 to-transparent" />
      </div>
      
      <p className="font-questrial text-[17px] text-white/70 leading-[1.8] mb-8">
        {description}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((detail, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-[10px] text-[#4fd1c5]/80 tracking-[0.2em] uppercase bg-white/[0.03] p-4 rounded-xl border border-white/5 group-hover:border-[#4fd1c5]/10 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5]/40 animate-pulse" />
            {detail}
          </div>
        ))}
      </div>
    </div>

    {/* High-Fidelity Glow Edge */}
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#4fd1c5] to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
  </motion.div>
);

export const ExecutionWaterfall = () => {
  return (
    <section className="relative w-full pb-60 pt-20 px-8 z-10">
      
      {/* SECTION HEADER: Pure Vision Alignment */}
      <div className="mb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#4fd1c5] font-microgramma tracking-[0.4em] text-[11px] mb-6 uppercase"
        >
          Spacedeck Architecture // The Prism
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-microgramma text-4xl md:text-5xl text-white mb-8 tracking-tight"
        >
          THE KINETIC LIFECYCLE.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-questrial text-white/40 max-w-2xl mx-auto leading-[1.8] text-lg"
        >
          We translate autonomous intent into institutional execution. 
          See how Spacedeck Protocol secures the supply chain of the Agentic Economy.
        </motion.p>
      </div>

      {/* THE WATERFALL STAIRCASE (Cymatics) */}
      <div className="space-y-24 relative max-w-6xl mx-auto">
        
        {/* Connection Rail */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block" />

        <WaterfallStep 
          index={0}
          icon={Zap}
          title="INTENT INTAKE"
          description="The AI agent (Eliza/Zerebro) sends an abstract, natural language request via our REST API or native framework harness. We decouple the command from the capital."
          details={["ABSTRACT_NLP_PARSE", "ASYNC_FIRE_AND_FORGET", "SDK_NATIVE_PLUGINS"]}
          side="left"
        />

        <WaterfallStep 
          index={1}
          icon={Binary}
          title="THE PRISM COLLAPSE"
          description="Spacedeck runs the intent through the ZK-Compliance Gate and the Binah Parser, collapsing chaos into a rigid Tetryonic JSON payload for institutional processing."
          details={["ZK_COMPLIANCE_PASS", "EIP-2612_VERIFICATION", "GOLDEN_PAYLOAD_GEN"]}
          side="right"
        />

        <WaterfallStep 
          index={2}
          icon={Server}
          title="SOLVER AUCTION"
          description="The GoldenPayload hits the private WebSocket stream. 65+ Bonded Solvers bid to fulfill the intent with zero slippage and absolute MEV protection."
          details={["RFQ_ORCHESTRATION", "50MS_BID_WINDOW", "SIPHON_FEE_CAPTURE"]}
          side="left"
        />

        <WaterfallStep 
          index={3}
          icon={Shield}
          title="DARK SETTLEMENT"
          description="Winning bid is settled on-chain via NEAR MPC Chain Signatures. No private keys are ever exposed. The loop is closed darkly and atomically."
          details={["KEYLESS_MPC_SIGNING", "JITO_STEALTH_SETTLE", "ATOMIC_DRAWDOWN"]}
          side="right"
        />

        {/* FINAL OMEGA RESONANCE */}
        <motion.div 
          className="flex flex-col items-center gap-6 pt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.0 }}
        >
          <div className="px-10 py-5 rounded-full bg-[#4fd1c5]/5 border border-[#4fd1c5]/30 text-[#4fd1c5] font-microgramma tracking-[0.3em] text-xs shadow-[0_0_40px_rgba(79,209,197,0.15)] uppercase">
            Resonance State: Optimal
          </div>
          <div className="font-questrial text-white/20 text-sm italic tracking-widest">
            — THE GLASS SHIP HAS DOCKED —
          </div>
        </motion.div>

      </div>
    </section>
  );
};
