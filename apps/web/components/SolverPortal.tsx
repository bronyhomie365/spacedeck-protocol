"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Check } from 'lucide-react';
import { useKineticStore } from '../store/useKineticStore';

const TerminalBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sis-terminal mt-4 group text-left">
      <div className="sis-terminal-header">
        <div className="flex gap-1.5 mr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
        </div>
        <span className="font-mono text-[10px] text-[#b7c8ff]/40 uppercase tracking-widest font-bold">terminal</span>
      </div>
      <div className="relative">
        <div className="p-4 pr-20 overflow-x-auto whitespace-pre font-mono text-[13px] text-[#cdd8ff] leading-relaxed">
          {code}
        </div>
        <button 
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 rounded bg-[#b7c8ff]/5 hover:bg-[#b7c8ff]/10 border border-[#b7c8ff]/10 text-[#b7c8ff]/60 text-[10px] font-questrial font-bold transition-all flex items-center gap-1.5"
        >
          {copied ? <Check size={12} className="text-[#b7c8ff]" /> : null}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

const ShardStep = ({ step, title, children }: any) => {
  const stepNumber = step.replace(/\D/g, '');

  return (
    <div className="sis-panel p-7 space-y-6 text-left">
      <div className="flex items-center gap-4">
        <div className="sis-step-label">
          <span className="uppercase leading-none text-[9px] font-microgramma font-bold">STEP</span>
          <span className="leading-none">{stepNumber}</span>
        </div>
        <div className="w-px h-4 bg-[#b7c8ff]/20" />
        <h2 className="sis-step-title">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export const SolverPortal = ({ active }: { active: boolean }) => {
  const setSolverMode = useKineticStore((state) => state.setSolverMode);

  React.useEffect(() => {
    if (active) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [active]);

  if (!active) return null;

  return (
    <motion.div 
      id="solver-portal-container"
      className="w-full max-w-[684px] mx-auto pt-[160px] pb-40 px-6 text-left block relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER SECTION */}
      <div className="mb-11">
        <div className="text-[#b7c8ff] font-microgramma tracking-[0.4em] text-[10px] mb-6 uppercase font-bold flex items-center gap-2">
          Spacedeck Protocol / Solver Network
        </div>
        <h1 className="sis-h1 mb-6">
          ZERO-CUSTODY EXECUTION. <br />EXCLUSIVE INSTITUTIONAL FLOW.
        </h1>
        <p className="sis-body mb-8 max-w-2xl">
          Spacedeck is a zero-custody executing broker for algorithmic agents. We aggregate strictly typed, price-insensitive order flow and route it exclusively to a closed network of whitelisted solvers. Zero mempool leakage. Absolute MEV capture.
        </p>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
        {[
          { val: "0 BPS", label: "Genesis Fee (30 Days)" },
          { val: "100%", label: "Alpha Retention" },
          { val: "400ms", label: "Latency Invariant" }
        ].map((stat, i) => (
          <div key={i} className="sis-panel p-7 flex flex-col items-center justify-center text-center">
            <div className="sis-stat-value mb-2 text-[#cdd8ff]">
              {stat.val}
            </div>
            <div className="text-[10px] text-[#b7c8ff]/50 font-questrial tracking-[0.05em] font-medium uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* STEPS SECTION */}
      <div className="space-y-6">
        <ShardStep step="Phase 1" title="Genesis Partnership Program">
          <p className="sis-body text-[14px]">
            To foster our initial liquidity network, the standard protocol execution fee is suspended for the first 30 days of Mainnet. Early integration partners retain <strong>100% of the execution alpha</strong>. The Phase 3 confidential clearing bond ($50k USDC) is deferred for Genesis participants.
          </p>
        </ShardStep>

        <ShardStep step="Phase 2" title="Deterministic Ingress">
          <p className="sis-body text-[14px]">
            Solvers receive strictly typed, Near MPC-authenticated intents directly via our Universal Socket. To guarantee cryptographic execution certainty, all routing must be compiled exclusively through the <code>jito-solana</code> bundle architecture.
          </p>
          <TerminalBlock code={`// [BUNDLE COLLAPSE]: Structuring the Atomic Strike\npub async fn execute_kinetic_strike(intent: SpacedeckIntent) -> Result<String, String> {\n    // 1. Verify Near MPC Signature\n    verify_handshake(&intent.agent_authority, &intent.signature_ed25519)?;\n\n    // 2. Compile Transaction & Wrap in Jito Bundle\n    let mut tx = Transaction::new_with_payer(&optimized_ixs, Some(&solver_pubkey));\n    let bundle = Bundle::new(vec![tx]).with_tip(calculate_jito_tip(intent.max_slippage_bps));\n\n    // 3. Submit directly to Block Engine\n    block_engine_client.send_bundle(bundle).await\n}`} />
        </ShardStep>

        <ShardStep step="Phase 3" title="Atomic Settlement Invariant">
          <p className="sis-body text-[14px]">
            Institutional capital requires absolute finality. Solvers operate within a strict <strong>400ms</strong> compilation window. To protect our agents from toxic flow, all execution must bypass the public mempool. Intents failing to land within the window are automatically re-routed.
          </p>
          <div className="flex gap-3 mt-4">
             <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest bg-[#b7c8ff]/5 border-[#b7c8ff]/20">ZERO MEMPOOL EXPOSURE</div>
             <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest bg-[#b7c8ff]/5 border-[#b7c8ff]/20">JITO BUNDLE FINALITY</div>
          </div>
        </ShardStep>

        <ShardStep step="Phase 4" title="Integration Initiation">
          <p className="sis-body text-[14px]">
            We are currently onboarding a select cohort of high-performance execution desks. Submit your institutional public key and 30-day historical volume metrics to initiate the technical integration process.
          </p>
          <TerminalBlock code={`# Execute application request directly to the Spacedeck kernel\ncurl -X POST https://api.spacedeck.network/v1/solver/apply \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "pubkey": "YourSolanaPubkeyGoesHere",\n    "volume_30d_usd": 15000000,\n    "contact": "@YourTelegramHandle"\n  }'`} />
        </ShardStep>
      </div>

      {/* FOOTER SECTION */}
      <div className="mt-18 pt-10 border-t border-[#b7c8ff]/10 text-center">
        <div 
          className="text-white uppercase italic leading-[0.85] text-center mb-6"
          style={{
            fontFamily: 'var(--font-microgramma), sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
            letterSpacing: '-0.02em',
          }}
        >
          BECOME OUR PARTNER
        </div>
        <p className="sis-body text-[14px] mb-8">Intelligence is decoupled from execution. Bring your latency.</p>
        
        <p className="text-[12px] text-[#b7c8ff]/50 font-questrial font-bold uppercase tracking-[0.1em]">Protocol Architecture at <span className="text-[#b7c8ff] hover:text-white cursor-pointer transition-colors">docs.spacedeck.xyz/solvers</span></p>
        
        {/* RETURN BUTTON */}
        <button 
          onClick={() => setSolverMode(false)}
          className="mt-16 sis-cta-secondary mx-auto text-[#b7c8ff]/80 border-[#b7c8ff]/20 hover:bg-[#b7c8ff]/10 hover:text-[#b7c8ff] font-microgramma text-[10px] tracking-widest uppercase font-bold"
        >
          [ Return to Command Center ]
        </button>
      </div>

    </motion.div>
  );
};