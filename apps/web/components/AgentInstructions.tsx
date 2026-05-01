"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, Lock, ShieldCheck, Cpu } from 'lucide-react';
import { useKineticStore } from '../store/useKineticStore';

const TerminalBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sis-terminal mt-4 group">
      <div className="sis-terminal-header">
        <div className="flex gap-1.5 mr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8ff]/30" />
        </div>
        <span className="font-mono text-[10px] text-[#b7c8ff]/40 uppercase tracking-widest font-bold">terminal</span>
      </div>
      <div className="relative">
        <div className="p-4 pr-16 overflow-x-auto whitespace-pre font-mono text-[13px] text-[#cdd8ff] leading-relaxed">
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

const PhaseBlock = ({ phase, title, icon: Icon, children }: any) => {
  return (
    <div className="sis-panel p-7 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 sis-step-label">
          <Icon size={14} className="text-[#b7c8ff]" />
          <span className="uppercase leading-none text-[9px] font-microgramma font-bold">PHASE {phase}</span>
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

export const AgentInstructions = ({ active }: { active: boolean }) => {
  const isDelegated = useKineticStore((state) => state.isDelegated);
  const setDelegated = useKineticStore((state) => state.setDelegated);
  const [activeTab, setActiveTab] = useState<'python' | 'eliza'>('python');
  const [isSimulatingCli, setIsSimulatingCli] = useState(false);
  const setAgentMode = useKineticStore((state) => state.setAgentMode);

  React.useEffect(() => {
    if (active) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [active]);

  if (!active) return null;

  const handleSimulateCli = () => {
    setIsSimulatingCli(true);
    setTimeout(() => { 
      setIsSimulatingCli(false); 
      setDelegated(true); 
    }, 2000);
  };

  return (
    <motion.div 
      id="agent-instructions-container"
      className="w-full max-w-[684px] mx-auto pt-[160px] pb-40 px-6 text-left block relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-11">
        <div className="text-[#b7c8ff] font-microgramma tracking-[0.4em] text-[10px] mb-6 uppercase font-bold flex items-center gap-2">
          <Terminal size={14} />
          Spacedeck Integration Manifold
        </div>
        <h1 className="sis-h1 mb-6">
          THE DETERMINISTIC KINETIC PIPELINE. <br />FROM RAW INTENT TO ATOMIC SETTLEMENT.
        </h1>
        <p className="sis-body mb-8 max-w-2xl">
          Spacedeck strictly decouples algorithmic intelligence from cryptographic execution. By integrating our Universal Socket, your autonomous agents bypass probabilistic mempools and gain keyless, deterministic command over institutional liquidity on the Solana Virtual Machine.
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => {
              const el = document.getElementById('phase-1-anchor');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="sis-cta-primary"
          >
            Initiate Forge Sequence <span className="text-[12px]">↓</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
        {[
          { val: "ZERO KEYS", label: "Near MPC Auth" },
          { val: "10 BPS", label: "Alpha Capture" },
          { val: "400ms", label: "Atomic Finality" }
        ].map((stat, i) => (
          <div key={i} className="sis-panel p-7 flex flex-col items-center justify-center text-center">
            <div className="sis-stat-value mb-2 text-[#cdd8ff]">
              {stat.val === "400ms" ? (
                <>400<span style={{ fontSize: '70%', opacity: 0.8 }}>ms</span></>
              ) : stat.val}
            </div>
            <div className="text-[10px] text-[#b7c8ff]/50 font-questrial tracking-[0.05em] font-medium uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* PHASE 1: TREASURY AUTHORIZATION */}
        <div id="phase-1-anchor">
          <PhaseBlock phase="1" title="Treasury Authorization (The Capital Guard)" icon={ShieldCheck}>
            <p className="sis-body text-[14px]">
              The agent cannot execute until the Human Operator sets a mathematical ceiling on-chain. This structural decoupling ensures the agent can never exceed its mandate or drain the vault.
            </p>
            <TerminalBlock code={`# Authorize the PDA Budget Ceiling (100,000 USDC limit)\nspacedeck-cli delegate --amount 100000 --asset USDC --agent agent.near`} />
            
            <div className="p-4 rounded-xl border border-[#b7c8ff]/20 bg-[#b7c8ff]/5 flex flex-col gap-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDelegated ? (
                    <ShieldCheck size={16} className="text-[#b7c8ff]" />
                  ) : (
                    <Lock size={16} className="text-[#b7c8ff]/50" />
                  )}
                  <span className="sis-body text-[14px] font-mono">
                    {isDelegated ? '[AUTHORITY ESTABLISHED]' : '[AWAITING PDA DELEGATION]'}
                  </span>
                </div>
                {!isDelegated && (
                  <button 
                    onClick={handleSimulateCli}
                    disabled={isSimulatingCli}
                    className="bg-[#b7c8ff]/10 hover:bg-[#b7c8ff]/20 text-[#b7c8ff] px-4 py-2 rounded-lg border border-[#b7c8ff]/30 font-microgramma text-[10px] uppercase tracking-widest transition-all font-bold disabled:opacity-50"
                  >
                    {isSimulatingCli ? 'EXECUTING CLI...' : 'SIMULATE CLI COMMAND'}
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {isDelegated && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="text-[12px] font-mono text-[#b7c8ff]/70 pt-3 border-t border-[#b7c8ff]/10"
                  >
                    Agent <span className="text-white">agent.near</span> is now cleared for deterministic execution up to a mathematical ceiling of 100,000 USDC.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </PhaseBlock>
        </div>

        {/* PHASE 2: AGENT EXECUTION */}
        <PhaseBlock phase="2" title="Agent Execution (The Kinetic Strike)" icon={Cpu}>
          <div className="flex gap-6 border-b border-[#b7c8ff]/10 mb-6">
            {['python', 'eliza'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-[13px] font-questrial transition-all relative tracking-[0.05em] ${activeTab === tab ? 'text-[#b7c8ff] font-bold' : 'text-[#b7c8ff]/40 hover:text-[#b7c8ff]/80'}`}
              >
                {tab === 'python' ? 'Python SDK (Quant)' : 'Eliza Framework (Cognitive)'}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b7c8ff]" />}
              </button>
            ))}
          </div>
          
          <p className="sis-body text-[14px]">
            {activeTab === 'python' 
              ? "Designed for high-frequency algorithmic agents. Install the Sovereign Bridge from the physical repository."
              : "Enable LLM-driven agents to command institutional capital securely, structurally rejecting prompt-injection attacks."
            }
          </p>

          {activeTab === 'python' ? (
            <TerminalBlock 
              code={`# 1. Install the Vessel SDK\npip install -e packages/sdk-python\n\n# 2. Dispatch deterministic SVM route via Near MPC\nfrom spacedeck_sdk import SpacedeckVessel\n\nvessel = SpacedeckVessel(near_account="agent.near")\nreceipt = await vessel.strike(\n    action="SWAP",\n    input_mint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", # USDC\n    output_mint="So11111111111111111111111111111111111111112", # SOL\n    amount=100_000,\n    max_slippage_bps=10\n)`} 
            />
          ) : (
            <TerminalBlock 
              code={`import { spacedeckPlugin } from "@spacedeck/eliza-plugin";\n\n// The plugin handles schema translation and Near MPC handshaking\nconst agent = new Agent({\n  plugins: [spacedeckPlugin],\n  config: {\n    spacedeck: {\n      near_account: "agent.near",\n      auth_mode: "NEAR_MPC"\n    }\n  }\n});`} 
            />
          )}
        </PhaseBlock>
      </div>

      <div className="mt-18 pt-10 border-t border-[#b7c8ff]/10">
        <div className="text-[#b7c8ff] font-microgramma text-sm font-bold uppercase tracking-[0.3em] mb-6">EXECUTION FINALITY</div>
        <p className="sis-body text-[14px] mb-4">The agent intent bypasses the public mempool and hits the Jito Engine:</p>
        
        <div className="sis-panel p-7 bg-[#b7c8ff]/[0.02] shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="font-mono text-[13px] text-[#cdd8ff]/90 whitespace-pre">
            <span className="text-[#b7c8ff]">[SOCKET]</span> Validating Near MPC Signature... <span className="text-green-400">OK</span><br/>
            <span className="text-[#b7c8ff]">[SENTINEL]</span> Checking PDA Budget Ceiling... <span className="text-green-400">OK</span><br/>
            <span className="text-[#b7c8ff]">[ORACLE]</span> Pyth slippage bounds verified... <span className="text-green-400">OK</span><br/>
            <span className="text-[#b7c8ff]">[ENGINE]</span> Dispatching private bundle to Jito...<br/><br/>
            <span className="text-blue-300">{"`Settled in 400ms | Alpha Captured: +22bps`"}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setAgentMode(false)}
          className="mt-16 sis-cta-secondary text-[#b7c8ff]/80 border-[#b7c8ff]/20 hover:bg-[#b7c8ff]/10 hover:text-[#b7c8ff] font-microgramma text-[10px] tracking-widest uppercase font-bold"
        >
          [ Return to Command Center ]
        </button>
      </div>
    </motion.div>
  );
};