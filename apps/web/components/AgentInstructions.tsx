"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, X } from 'lucide-react';
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

const ShardStep = ({ step, title, children }: any) => {
  const stepNumber = step.replace(/\D/g, '');

  return (
    <div className="sis-panel p-7 space-y-6">
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

export const AgentInstructions = ({ active }: { active: boolean }) => {
  const [keyState, setKeyState] = useState<'locked' | 'live'>('locked');
  const [activeTab, setActiveTab] = useState<'eliza' | 'zerebro' | 'rig' | 'rest'>('eliza');
  const [isSigning, setIsSigning] = useState(false);
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const setAgentMode = useKineticStore((state) => state.setAgentMode);

  React.useEffect(() => {
    if (active) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [active]);

  if (!active) return null;

  const handleUpgrade = async () => {
    if (!isConnected) { openConnectModal?.(); return; }
    setIsSigning(true);
    setTimeout(() => { setIsSigning(false); setKeyState('live'); }, 1500);
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
        <div className="text-[#b7c8ff] font-microgramma tracking-[0.4em] text-[10px] mb-6 uppercase font-bold">
          Spacedeck Protocol
        </div>
        <h1 className="sis-h1 mb-6">
          UNLEASH YOUR AI. <br />SPACEDECK HANDLES COMPLEXITY.
        </h1>
        <p className="sis-body mb-8 max-w-2xl">
          We engineered the Spacedeck Protocol to collapse the entire Web3 backend into a single execution layer for your autonomous systems. By integrating our harnesses, your agent bypasses manual transaction drag and gains instant, programmatic command over absolute liquidity. Set your security parameters, establish the connection, and let your AI operate at the speed of thought.
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => {
              const el = document.getElementById('step-1-anchor');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="sis-cta-primary"
          >
            Unlock API Key <span className="text-[12px]">↓</span>
          </button>
          <button className="sis-cta-secondary">Read the Docs <span className="text-[12px]">↗</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
        {[
          { val: "ZERO", label: "Private Key Exposure" },
          { val: "65+", label: "Institutional Solvers" },
          { val: "12s", label: "Avg. Settlement Time" }
        ].map((stat, i) => (
          <div key={i} className="sis-panel p-7 flex flex-col items-center justify-center text-center">
            <div className="sis-stat-value mb-2">
              {stat.val === "12s" ? (
                <>12<span style={{ fontSize: '70%', opacity: 0.8 }}>s</span></>
              ) : stat.val}
            </div>
            <div className="text-[10px] text-[#b7c8ff]/50 font-questrial tracking-[0.05em] font-medium uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div id="step-1-anchor">
          <ShardStep step="Step 1" title="Get your token">
          <p className="sis-body text-[14px]">
            Use the sandbox token for immediate testing, or connect a wallet to sign an EIP-2612 permit for live execution budget.
          </p>
          <div className="p-4 rounded-xl border border-[#b7c8ff]/20 bg-[#b7c8ff]/5 flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <Check size={16} className="text-[#b7c8ff]" />
              <span className="sis-body text-[14px]">
                {keyState === 'live' ? 'You have an active production token.' : <>Sandbox Gateway initialized.<br />Ready for dev.</>}
              </span>
            </div>
            {keyState === 'locked' && (
              <button 
                onClick={handleUpgrade}
                className="bg-[#b7c8ff]/10 hover:bg-[#b7c8ff]/20 text-[#b7c8ff] px-4 py-2 rounded-lg border border-[#b7c8ff]/30 font-microgramma text-[10px] uppercase tracking-widest transition-all font-bold"
              >
                {isSigning ? 'SIGNING...' : 'AUTHORIZE LIVE BUDGET'}
              </button>
            )}
          </div>
        </ShardStep>
        </div>

        <ShardStep step="Step 2" title="Set your environment">
          <p className="text-[#b7c8ff]/60 font-questrial text-[13px] font-bold uppercase tracking-[0.1em] mb-2">Paste into your terminal</p>
          <TerminalBlock code={`export SPACEDECK_API_BASE="https://api.spacedeck.xyz/api/v1"\nexport SPACEDECK_AGENT_KEY="${keyState === 'live' ? 'sk_live_' + address?.slice(0,8) + '...' : 'sk_test_SANDBOX_TOKEN'}"`} />
        </ShardStep>

        <ShardStep step="Step 3" title="Install the harness">
          <div className="flex gap-6 border-b border-[#b7c8ff]/10 mb-6">
            {['eliza', 'zerebro', 'rig', 'rest'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-[13px] font-questrial transition-all relative tracking-[0.05em] ${activeTab === tab ? 'text-[#b7c8ff] font-bold' : 'text-[#b7c8ff]/40 hover:text-[#b7c8ff]/80'}`}
              >
                {tab === 'rest' ? 'Custom / REST' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b7c8ff]" />}
              </button>
            ))}
          </div>
          <p className="sis-body text-[14px]">
            {activeTab === 'rest' 
              ? "Integrate directly using our OpenAPI endpoints from any language."
              : `Install the Spacedeck harness in ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} so your assistant can command capital with zero friction.`
            }
          </p>
          <TerminalBlock 
            code={
              activeTab === 'eliza' ? `npm install @spacedeck-protocol/eliza-plugin` :
              activeTab === 'zerebro' ? `npm install @spacedeck-protocol/zerebro-harness` :
              activeTab === 'rig' ? `cargo add spacedeck-rig-sdk` :
              `curl -X POST $SPACEDECK_API_BASE/parse_intent \\\n  -H "Authorization: Bearer $SPACEDECK_AGENT_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"raw_prompt": "Provide 1000 USDC to Kamino", "wallet_id": "0x..."}'`
            } 
          />
        </ShardStep>

        <ShardStep step="Step 4" title="Verify the connection">
          <p className="sis-body text-[14px]">
            Run a quick resonance check to ensure the Prism Logic Layer and Risk & Compliance Sentinel are synchronized.
          </p>
          <TerminalBlock code={`curl "$SPACEDECK_API_BASE/status" \\\n  -H "Authorization: Bearer $SPACEDECK_AGENT_KEY"`} />
        </ShardStep>
      </div>

      <div className="mt-18 pt-10 border-t border-[#b7c8ff]/10">
        <div className="text-[#b7c8ff] font-microgramma text-sm font-bold uppercase tracking-[0.3em] mb-6">EXECUTE YOUR FIRST INTENT.</div>
        <p className="sis-body text-[14px] mb-4">Inject this directly into your agent's action loop:</p>
        
        <div className="sis-panel p-7 bg-[#b7c8ff]/[0.02] shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="font-mono text-[13px] text-[#cdd8ff]/90 whitespace-pre">
            <span className="text-[#b7c8ff]">const</span> intent = <span className="text-white/80">"I want to move 100k USDC into a delta-neutral SOL/USDC yield position on Kamino with absolute MEV protection."</span>;<br/><br/>
            <span className="text-[#b7c8ff]/40">// The harness automatically handles parsing, auction, and execution</span><br/>
            <span className="text-[#b7c8ff]">const</span> receipt = <span className="text-[#b7c8ff]">await</span> spacedeck.<span className="text-blue-300">execute</span>(intent);<br/><br/>
            console.<span className="text-blue-300">log</span>(<span className="text-white/80">{"`Settled via ${receipt.solver_id} at ${receipt.protocol_yield_bps / 100}% APY`"}</span>);
          </div>
        </div>

        <p className="mt-8 text-[12px] text-[#b7c8ff]/50 font-questrial font-bold uppercase tracking-[0.1em]">Need deeper integration? <span className="text-[#b7c8ff] hover:text-white cursor-pointer transition-colors">Read the Copilot Docs</span></p>
        
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