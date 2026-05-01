"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Server, Gauge, CheckCircle2, Loader2 } from 'lucide-react';

const WaterfallStep = ({ 
  index,
  icon: Icon, 
  title, 
  description, 
  details, 
  side = 'left',
  isActive = false,
  isCompleted = false,
  isLive = false
}: { 
  index: number,
  icon: any, 
  title: string, 
  description: string, 
  details: string[], 
  side?: 'left' | 'right',
  isActive?: boolean,
  isCompleted?: boolean,
  isLive?: boolean
}) => (
  <motion.div 
    className={`relative group flex flex-col md:flex-row gap-8 p-10 rounded-[2rem] border transition-all duration-700 max-w-4xl mx-auto 
      ${side === 'right' ? 'md:translate-x-12' : 'md:-translate-x-12'}
      ${isActive ? 'bg-[#b7c8ff]/10 border-[#b7c8ff]/40 shadow-[0_0_40px_rgba(183,200,255,0.1)]' : 'bg-[#020617]/40 border-white/5 backdrop-blur-3xl'}
      ${isCompleted ? 'opacity-60 border-[#b7c8ff]/20' : ''}
    `}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Rhythmic Step Number */}
    <div className={`absolute -top-6 -left-6 w-14 h-14 rounded-full bg-[#020617] border flex items-center justify-center font-bubbly text-2xl transition-all duration-500
      ${isActive ? 'border-[#b7c8ff] text-[#b7c8ff] scale-110 shadow-[0_0_20px_#b7c8ff33]' : 'border-white/10 text-white/40'}
      ${isCompleted ? 'border-[#b7c8ff]/60 text-[#b7c8ff]/60' : ''}
    `}>
      {isCompleted ? <CheckCircle2 size={24} /> : index + 1}
    </div>

    {/* Left Icon Rail */}
    <div className="flex flex-col items-center shrink-0">
      <div className={`w-16 h-16 rounded-[1.2rem] border flex items-center justify-center transition-all duration-700
        ${isActive ? 'bg-[#b7c8ff]/10 border-[#b7c8ff]/30 shadow-[0_0_30px_#b7c8ff22]' : 'bg-white/5 border-white/10'}
      `}>
        {isActive && !isCompleted ? (
          <Loader2 size={28} className="text-[#b7c8ff] animate-spin" />
        ) : (
          <Icon size={28} className={isActive || isCompleted ? "text-[#b7c8ff]" : "text-white/40"} />
        )}
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 pt-1">
      <div className="flex items-center gap-3 mb-3">
        <h3 className={`font-microgramma text-xl tracking-widest uppercase transition-colors ${isActive ? 'text-[#b7c8ff]' : 'text-white'}`}>{title}</h3>
        <div className={`h-px flex-1 bg-gradient-to-r from-[#b7c8ff]/30 to-transparent transition-opacity ${isActive ? 'opacity-100' : 'opacity-20'}`} />
      </div>
      
      <p className="font-questrial text-[17px] text-white/70 leading-[1.8] mb-8">
        {description}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((detail, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase bg-white/[0.03] p-4 rounded-xl border border-white/5 transition-colors">
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#b7c8ff] animate-pulse' : 'bg-white/20'}`} />
            <span className={isActive ? 'text-[#b7c8ff]' : 'text-white/40'}>{detail}</span>
          </div>
        ))}
      </div>
    </div>

    {/* High-Fidelity Glow Edge */}
    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#b7c8ff] to-transparent transition-opacity ${isActive ? 'opacity-60' : 'opacity-0'}`} />
  </motion.div>
);

interface ExecutionWaterfallProps {
  isLive?: boolean;
  currentStep?: number;
}

export const ExecutionWaterfall = ({ isLive = false, currentStep = -1 }: ExecutionWaterfallProps) => {
  // [V3 CONTENT]: EVM hallucinations purged. 2-stage pipeline reflected.
  const steps = [
    {
      icon: Zap,
      title: "Intent Ingestion",
      description: "Autonomous agents (Eliza/Zerebro) transmit abstract NLP requests. Spacedeck Prism refracts raw intent into deterministic executable schemas.",
      details: ["NLP_TO_GOLDEN_PAYLOAD", "PRISM_REFRACTION", "ASYNC_INGESTION"]
    },
    {
      icon: Shield,
      title: "Capital Authorization",
      description: "PDA Budget Delegation decouples authorization from execution. The operator sets a mathematical ceiling on agent capital via a single on-chain instruction. Near MPC signs the intent keylessly.",
      details: ["PDA_BUDGET_DELEGATION", "NEAR_MPC_AUTH", "KEYLESS_GUARDRAILS"]
    },
    {
      icon: Server,
      title: "Transaction Settlement",
      description: "Authorized payloads enter the solver marketplace. Bonded institutional solvers bid to fill the order at optimal price, shielded from public mempool extraction via Jito bundles.",
      details: ["SOLVER_AUCTION_BIDS", "MEV_SHIELD_ACTIVE", "JITO_BUNDLE_ROUTING"]
    },
    {
      icon: Gauge,
      title: "Atomic Finality",
      description: "Settlement executes atomically in a single Solana block. The Jito bundle either lands completely with verified slippage bounds, or reverts entirely with zero capital loss.",
      details: ["SLIPPAGE_VERIFICATION", "ATOMIC_SETTLEMENT", "400MS_FINALITY"]
    }
  ];

  return (
    <section className={`relative w-full z-10 ${isLive ? 'pb-20 pt-10' : 'pb-60 pt-20 px-8'}`}>
      
      {!isLive && (
        <div className="mb-32 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#b7c8ff] font-microgramma tracking-[0.4em] text-[11px] mb-6 uppercase"
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
            THE EXECUTION LIFECYCLE.
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
      )}

      {isLive && (
        <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#b7c8ff] animate-ping" />
            <span className="font-microgramma text-[#b7c8ff] text-xs tracking-widest uppercase">Active Settlement in Progress</span>
          </div>
          <div className="text-white/40 font-mono text-[10px] tracking-widest">
            PHASE: {currentStep + 1} / 4
          </div>
        </div>
      )}

      {/* THE WATERFALL STAIRCASE */}
      <div className={`space-y-24 relative max-w-6xl mx-auto ${isLive ? 'scale-[0.85] origin-top' : ''}`}>
        
        {/* Connection Rail */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block" />

        {steps.map((step, idx) => (
          <WaterfallStep 
            key={idx}
            index={idx}
            icon={step.icon}
            title={step.title}
            description={step.description}
            details={step.details}
            side={idx % 2 === 0 ? 'left' : 'right'}
            isActive={isLive && currentStep === idx}
            isCompleted={isLive && currentStep > idx}
            isLive={isLive}
          />
        ))}

        {isLive && currentStep === steps.length - 1 && (
          <motion.div 
            className="flex flex-col items-center gap-6 pt-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.0 }}
          >
            <div className="px-10 py-5 rounded-full bg-[#b7c8ff]/10 border border-[#b7c8ff]/30 text-[#b7c8ff] font-microgramma tracking-[0.3em] text-xs shadow-[0_0_40px_rgba(183,200,255,0.2)] uppercase">
              Settlement Reaching Finality
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
