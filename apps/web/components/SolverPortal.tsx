"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Server, Zap, Lock, Loader2, Network, Check, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
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
  const [keyState, setKeyState] = useState<'locked' | 'live'>('locked');
  const [isBonding, setIsBonding] = useState(false);
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const setSolverMode = useKineticStore((state) => state.setSolverMode);

  React.useEffect(() => {
    if (active) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [active]);

  if (!active) return null;

  const handleBond = async () => {
    if (!isConnected) { openConnectModal?.(); return; }
    setIsBonding(true);
    setTimeout(() => { setIsBonding(false); setKeyState('live'); }, 2000);
  };

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
        <div className="text-[#b7c8ff] font-microgramma tracking-[0.4em] text-[10px] mb-6 uppercase font-bold">
          Spacedeck Protocol // Solver Network
        </div>
        <h1 className="sis-h1 mb-6">
          MONETIZE LIQUIDITY. <br />CAPTURE THE SIPHON.
        </h1>
        <p className="sis-body mb-8 max-w-2xl">
          Institutional orderflow is the lifeblood of the Agentic Economy. By joining the Spacedeck Solver Network, you gain direct access to shielded agent intents that require professional-grade execution.
        </p>
        
        <div className="flex gap-4">
          <button className="sis-cta-primary">Relayer Specs <span className="text-[12px]">↗</span></button>
          <button className="sis-cta-secondary">Bonding Guide <span className="text-[12px]">↗</span></button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
        {[
          { val: "10 BPS", label: "Fixed Protocol Siphon" },
          { val: "22ms", label: "P99 Latency" },
          { val: "1.00", label: "Fill Precision" }
        ].map((stat, i) => (
          <div key={i} className="sis-panel p-7 flex flex-col items-center justify-center text-center">
            <div className="sis-stat-value mb-2">
              {stat.val}
            </div>
            <div className="text-[10px] text-[#b7c8ff]/50 font-questrial tracking-[0.05em] font-medium uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* STEPS SECTION */}
      <div className="space-y-6">
        <ShardStep step="Step 1" title="Deploy the relayer">
          <p className="sis-body text-[14px]">
            Run the Spacedeck Docker image on your local hardware for zero-lag access to the intent firehose.
          </p>
          <TerminalBlock code={`docker pull spacedeckprotocol/relayer-node:latest\ndocker run -d --net=host spacedeckprotocol/relayer-node`} />
        </ShardStep>

        <ShardStep step="Step 2" title="Bond collateral">
          <p className="sis-body text-[14px]">
            Lock $50,000 USDC bond to guarantee execution certainty for agents. This prevents toxic flow and protects the AI's capital.
          </p>
          <button 
            onClick={handleBond} 
            disabled={isBonding} 
            className="mt-4 px-8 py-3 rounded-xl bg-[#b7c8ff]/10 border border-[#b7c8ff]/30 text-[#b7c8ff] hover:bg-[#b7c8ff]/20 transition-all font-microgramma text-[10px] tracking-widest uppercase font-bold flex items-center gap-2"
          >
            {isBonding ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
            {isBonding ? 'BONDING...' : keyState === 'live' ? 'BOND ACTIVE' : 'DEPOSIT $50k BOND'}
          </button>
        </ShardStep>

        <ShardStep step="Step 3" title="Connect your engine">
          <p className="sis-body text-[14px]">
            Hook your proprietary pricing algorithm into the private WebSocket firehose to receive intent streams in real-time.
          </p>
          <div className="flex gap-3">
             <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest">WSS_STREAM</div>
             <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest">50MS_WINDOW</div>
          </div>
        </ShardStep>

        <ShardStep step="Step 4" title="Verify the stream">
          <p className="sis-body text-[14px]">
            Run a heartbeat check to ensure the Liquidity Settlement Fabric synchronization is live and you are receiving bids.
          </p>
          <div className="flex gap-3">
             <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest">NODE_HEALTH_200</div>
             <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-[#b7c8ff]/70 uppercase tracking-widest">SIPHON_ACTIVE</div>
          </div>
        </ShardStep>
      </div>

      {/* FOOTER SECTION */}
      <div className="mt-18 pt-10 border-t border-[#b7c8ff]/10 text-center">
        <div className="text-[#b7c8ff] font-microgramma text-sm font-bold uppercase tracking-[0.3em] mb-6">READY TO SOLVE.</div>
        <p className="sis-body text-[14px] mb-8">Monitor your win-rate and siphon capture in the Solver Dashboard.</p>
        
        <p className="text-[12px] text-[#b7c8ff]/50 font-questrial font-bold uppercase tracking-[0.1em]">Full documentation at <span className="text-[#b7c8ff] hover:text-white cursor-pointer transition-colors">docs.spacedeck.xyz/solvers</span></p>
        
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