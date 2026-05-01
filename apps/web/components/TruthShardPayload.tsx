"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useKineticStore } from '../store/useKineticStore';

const TerminalBlock = ({ code }: { code: string }) => (
  <div className="sis-terminal mt-6 group">
    <div className="sis-terminal-header">
      <div className="flex gap-1.5 mr-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
      </div>
      <span className="font-mono text-[10px] text-[#b7c8ff]/40 uppercase tracking-widest font-bold">terminal</span>
    </div>
    <div className="p-4 overflow-x-auto whitespace-pre font-mono text-[13px] text-[#cdd8ff] leading-relaxed">
      {code}
    </div>
  </div>
);

const ShardStep = ({ title, description, details, index }: any) => (
  <div className="sis-panel p-7 space-y-6">
    <div className="flex items-center gap-4">
      <div className="sis-step-label">
        <span className="uppercase leading-none text-[9px] font-microgramma font-bold">STEP</span>
        <span className="leading-none">{index + 1}</span>
      </div>
      <div className="w-px h-4 bg-[#b7c8ff]/20" />
      <h2 className="sis-step-title">{title}</h2>
    </div>
    <div className="space-y-4">
      <p className="sis-body text-[14px]">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {details.map((detail: string, i: number) => (
          <div key={i} className="flex items-center gap-3 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest bg-white/[0.02] p-3 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b7c8ff]/40" />
            {detail}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SHARD_CONTENT: Record<string, any> = {
  'prism': {
    title: "THE PRISM // KINETIC LIFECYCLE",
    description: "Collapse chaotic natural language intent into deterministic institutional execution vectors.",
    steps: [
      { title: "INTENT INTAKE", description: "Abstract NLP request received from Agent framework (Eliza/Zerebro).", details: ["NLP_PARSE", "ASYNC_FIRE", "SDK_NATIVE"] },
      { title: "PRISM COLLAPSE", description: "ZK-Compliance screening and Binah parsing into a GoldenPayload JSON.", details: ["ZK_PASS", "NEAR_MPC_VERIFY", "GOLDEN_PAYLOAD"] },
      { title: "SOLVER AUCTION", description: "65+ Bonded Solvers bid to fulfill orderflow in 50ms windows.", details: ["RFQ_ENGINE", "SIPHON_CAPTURE", "MEV_SHIELD"] },
      { title: "DARK SETTLEMENT", description: "Winning bid settled via NEAR MPC Chain Signatures darkly.", details: ["KEYLESS_MPC", "JITO_STEALTH", "ATOMIC_SETTLE"] }
    ]
  },
  'permits': {
    title: "PDA DELEGATION // THE NUCLEAR SHIELD",
    description: "Decouple Budget Authorization from Execution Signing. Your keys never leave your control.",
    steps: [
      { title: "BUDGET DELEGATION", description: "User initializes a programmatic SVM PDA to authorize a specific USDC budget.", details: ["PROGRAMMATIC_AUTH", "OFF_CHAIN_APPROVE"] },
      { title: "SPENDER LOCK", description: "Spacedeck Clearinghouse is authorized as the only valid spender via PDA.", details: ["PROTOCOL_GUARD", "NONCE_VERIFY"] },
      { title: "DELEGATED EXEC", description: "Agent uses authorized budget via API keys without private key exposure.", details: ["BUDGET_VS_KEY", "SCOPED_AUTH"] }
    ]
  },
  'eliza': {
    title: "ELIZA // FRAMEWORK HARNESS",
    description: "Plug the Spacedeck Prism directly into Eliza for professional-grade execution.",
    steps: [
      { title: "INSTALL PLUGIN", description: "Import the native Spacedeck plugin into your Eliza environment.", details: ["NPM_INSTALL", "NATIVE_HARNESS"] },
      { title: "INJECT KEYS", description: "Configure environment variables with your Spacedeck API key.", details: ["ENV_VARIABLES", "SPACEDECK_AUTH"] }
    ],
    code: `npm install @spacedeck-protocol/eliza-plugin`
  }
};

export const TruthShardPayload = ({ activeShard }: { activeShard: string | null }) => {
  const setTruthShard = useKineticStore((state) => state.setTruthShard);
  
  React.useEffect(() => {
    if (activeShard) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [activeShard]);

  if (!activeShard) return null;
  const content = SHARD_CONTENT[activeShard] || SHARD_CONTENT['prism'];

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] overflow-y-auto overflow-x-hidden flex justify-center custom-scrollbar bg-[#020617] backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[684px] w-full px-6 pt-[160px] pb-32 relative">
        
        <div className="mb-11">
          <div className="text-[#b7c8ff] font-microgramma tracking-[0.4em] text-[10px] mb-6 uppercase font-bold">
            Spacedeck Protocol // {activeShard.toUpperCase()}
          </div>
          <h1 className="sis-h1 mb-6">
            {content.title}
          </h1>
          <p className="sis-body mb-8">
            {content.description}
          </p>
          <button 
            onClick={() => setTruthShard(null)}
            className="sis-cta-secondary"
          >
            [ ESC ] Close Knowledge Node
          </button>
        </div>

        <div className="space-y-6">
          {content.steps.map((step: any, i: number) => (
            <ShardStep key={i} index={i} {...step} />
          ))}
        </div>

        {content.code && <TerminalBlock code={content.code} />}

        <div className="mt-20 pt-10 border-t border-[#b7c8ff]/10 text-center">
          <div onClick={() => setTruthShard(null)} className="cursor-pointer font-microgramma text-[10px] text-[#b7c8ff] tracking-[0.3em] uppercase hover:brightness-125 transition-all font-bold">
            Return to Command Center
          </div>
        </div>

      </div>
    </motion.div>
  );
};