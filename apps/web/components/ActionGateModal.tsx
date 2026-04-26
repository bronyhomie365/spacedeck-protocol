"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useKineticStore } from "../store/useKineticStore";
import { useKineticEngine } from "../hooks/useKineticEngine";
import { ShieldAlert, ArrowRight, X, Zap, Split, Shield, RefreshCw } from "lucide-react";
import { KineticCore } from "./ui/KineticCore";

export const ActionGateModal = () => {
  const { activePayload, isExecuting, clearPayload } = useKineticStore();
  const { executeSettlement } = useKineticEngine();

  if (!activePayload) return null;

  const questrialStack = "var(--font-questrial), sans-serif";
  const isDeltaNeutral = activePayload.vector_type === "PHI_ALGORITHM" || activePayload.vector_type === "DELTA_NEUTRAL";
  const isMultiplexed = activePayload.is_multiplexed || activePayload.engine_multiplex_staking;
  const isAutoSwap = activePayload.is_auto_swap || activePayload.engine_swap_active;

  const spacedeckFrameStyle = {
    background: 'linear-gradient(165deg, rgba(10, 15, 28, 0.95), rgba(4, 8, 18, 0.98))',
    backdropFilter: 'blur(40px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(40px) saturate(1.5)',
    border: '1px solid rgba(183, 200, 255, 0.12)',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(183, 200, 255, 0.05)'
  };

  const bubblyStack = "var(--font-bubbly), sans-serif";

  const displayNodes = (isMultiplexed && (!activePayload.execution_nodes || activePayload.execution_nodes.length === 0))
    ? [
        { protocol: "KAMINO_LEND", allocation_pct: 65, apy_bps: 1240, asset: activePayload.source_asset },
        { protocol: "AAVE_V3", allocation_pct: 25, apy_bps: 810, asset: activePayload.source_asset },
        { protocol: "JUPITER_LST", allocation_pct: 10, apy_bps: 1520, asset: activePayload.source_asset }
      ]
    : activePayload.execution_nodes;

  const handleCryptographicIgnition = async () => {
      if (!activePayload) return;
      try {
          // [SVM / NEAR MPC REALITY]
          // Off-chain Ed25519 signature request to Near MPC Relayer
          const simulatedMpcSignature = "ed25519:5H9b_keyless_auth_" + Date.now();
          executeSettlement({ ...activePayload }, simulatedMpcSignature);
      } catch (error) { 
          console.error("Kinetic authorization rejected", error);
      }
  };

  return (
    <div className="w-full h-full p-8 relative overflow-y-auto custom-scrollbar flex flex-col items-center justify-start gap-4" style={{ fontFamily: questrialStack }}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(147, 197, 253, 0.01); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(96, 165, 250, 0.1); border-radius: 10px; }
      `}</style>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        <div className="flex flex-col gap-3 border-b border-white/5 pb-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0 select-none px-2">
                <img 
                  src="/machine2machine.png" 
                  alt="Machine Agent" 
                  className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(147,197,253,0.4)]" 
                />
                <div className="flex items-center gap-1 text-[#93C5FD]/70 text-[6px]">
                  <span>✦</span>
                  <span>✦</span>
                  <span>✦</span>
                </div>
                <img 
                  src="/machine2machine.png" 
                  alt="Machine Agent Flip" 
                  className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(147,197,253,0.4)]" 
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-white font-bold tracking-[0.25em] text-[12px] uppercase leading-none mt-1" style={{ fontFamily: "var(--font-microgramma), sans-serif", fontWeight: 900 }}>
                  MACHINE-TO-MACHINE SIMULATION
                </h2>
                <div className="text-[#93C5FD]/60 text-[10px] tracking-wide mt-1.5 leading-none font-medium" style={{ fontFamily: "var(--font-questrial), sans-serif" }}>
                  <span className="opacity-80 mr-1 tracking-normal hover:text-[#93C5FD] transition-colors cursor-help">(?)</span>
                  Simulated execution of AI agent intent via Spacedeck routing infrastructure
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={clearPayload} className="text-white/20 hover:text-white/80 transition-all p-1 hover:scale-110"><X size={16} /></button>
              <div className="px-2 py-0.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#93C5FD] text-[8px] font-bold tracking-widest uppercase">Shield Active</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <div className="p-5 rounded-[20px] relative overflow-hidden group transition-all text-left" style={spacedeckFrameStyle}>
            <div className="text-[#b7c8ff]/40 text-[8px] mb-3 tracking-[0.2em] uppercase font-bold" style={{ textShadow: "0 0 6px rgba(183,200,255,0.3)" }}>Deployment Capital</div>
            <div className="flex flex-col">
              <div className="text-white font-semibold text-2xl tracking-tighter" style={{ fontFamily: bubblyStack, textShadow: "0 0 12px rgba(255,255,255,0.2)" }}>{activePayload.use_max_balance ? "[ MAX CAPACITY ]" : `$${activePayload.amount_usd.toLocaleString()}`}</div>
              <div className="text-[#b7c8ff]/80 font-bold text-[10px] tracking-widest mt-0.5 uppercase">{activePayload.source_asset}</div>
            </div>
          </div>

          <div className="px-1 flex flex-col items-center justify-center relative min-h-[140px]">
            <KineticCore payload={activePayload} />
          </div>

          <div className="flex flex-col gap-2 h-full">
            {isDeltaNeutral ? (
              <div className="flex flex-col gap-2 h-full">
                <div className="p-4 rounded-[16px] flex-1 flex flex-col justify-center text-left" style={spacedeckFrameStyle}>
                  <div className="text-[#b7c8ff]/40 text-[7px] tracking-widest uppercase font-bold mb-1">Spot Long</div>
                  <div className="text-white text-sm font-bold uppercase" style={{ textShadow: "0 0 6px rgba(183,200,255,0.5)" }}>100% {activePayload.target_asset || "SOL"}</div>
                </div>
                <div className="p-4 rounded-[16px] flex-1 flex flex-col justify-center text-left" style={{ ...spacedeckFrameStyle, background: 'linear-gradient(165deg, rgba(239, 68, 68, 0.03), rgba(0, 0, 0, 0.85))' }}>
                  <div className="text-red-400/40 text-[7px] tracking-widest uppercase font-bold mb-1">Perp Short</div>
                  <div className="text-red-300 text-sm font-bold uppercase" style={{ textShadow: "0 0 6px rgba(239,68,68,0.5)" }}>100% {activePayload.target_asset || "SOL"}-PERP</div>
                </div>
              </div>
            ) : isMultiplexed ? (
              <div className="p-4 rounded-[20px] h-full flex flex-col overflow-hidden text-left" style={spacedeckFrameStyle}>
                <div className="text-[#b7c8ff]/40 text-[8px] mb-3 tracking-[0.2em] uppercase font-bold text-left border-b border-[#b7c8ff]/10 pb-2">Portfolio Allocation</div>
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                  {displayNodes?.map((node, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                      <div className="text-left">
                        <div className="text-white/90 text-[10px] font-bold uppercase tracking-[0.1em]">{node.protocol}</div>
                        <div className="text-[#b7c8ff]/60 text-[9px]" style={{ fontFamily: bubblyStack }}>{activePayload.use_max_balance ? `${node.allocation_pct}% Volume` : `$${(activePayload.amount_usd * node.allocation_pct / 100).toLocaleString()}`}</div>
                      </div>
                      <div className="text-right flex flex-col">
                        <div className="text-[#b7c8ff] text-[11px] font-bold" style={{ fontFamily: bubblyStack, textShadow: "0 0 6px rgba(183,200,255,0.4)" }}>{node.allocation_pct}%</div>
                        <div className="text-[#b7c8ff]/70 text-[9px]" style={{ fontFamily: bubblyStack }}>{(node.apy_bps / 100).toFixed(1)}% APY</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-[20px] h-full flex flex-col justify-center relative overflow-hidden group text-left" style={spacedeckFrameStyle}>
                <div className="text-[#b7c8ff]/40 text-[8px] mb-3 tracking-[0.2em] uppercase font-bold" style={{ textShadow: "0 0 6px rgba(183,200,255,0.3)" }}>Execution Target</div>
                <div className="flex flex-col">
                  <div className="text-white font-semibold text-2xl tracking-[0.1em] uppercase" style={{ textShadow: "0 0 12px rgba(255,255,255,0.2)" }}>{activePayload.target_protocol}</div>
                  <div className="text-[#b7c8ff]/80 font-bold text-[11px] tracking-[0.1em] mt-0.5" style={{ fontFamily: activePayload.vector_type === "PURE_SWAP" ? questrialStack : bubblyStack, textShadow: "0 0 6px rgba(183,200,255,0.4)" }}>{activePayload.vector_type === "PURE_SWAP" ? "EXCHANGE EXECUTION" : `${(activePayload.estimated_apy_bps / 100).toFixed(2)}% APY`}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-[20px] text-left" style={spacedeckFrameStyle}>
          <div className="text-[#b7c8ff]/30 text-[8px] mb-4 tracking-[0.2em] uppercase font-bold border-b border-[#b7c8ff]/10 pb-2">Projected Outcomes</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#b7c8ff]/40 tracking-[0.1em] font-medium uppercase">ESTIMATED MEV SAVINGS</span>
              <span className="text-[#b7c8ff] font-bold text-[12px]" style={{ fontFamily: bubblyStack, textShadow: "0 0 6px rgba(183,200,255,0.4)" }}>{activePayload.use_max_balance ? "+1.3%" : `+$${(activePayload.amount_usd * 0.013).toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#b7c8ff]/40 tracking-[0.1em] font-medium uppercase">PLATFORM FEE (0.10%)</span>
              <span className="text-white/60 font-semibold text-[12px]" style={{ fontFamily: bubblyStack }}>{activePayload.use_max_balance ? "-0.1%" : `-$${(activePayload.amount_usd * 0.001).toLocaleString()}`}</span>
            </div>
          </div>
        </div>

        {/* PRE-TRADE COMPLIANCE BOUNDS */}
        <div className="mt-6 mb-8 border-t border-slate-800 pt-6">
          <h4 className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-widest">Pre-Trade Compliance Bounds</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#050505] border border-slate-800 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Max Slippage</span>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-lg font-mono text-white">25</span><span className="text-[10px] font-mono text-teal-500">BPS</span>
              </div>
            </div>
            <div className="bg-[#050505] border border-slate-800 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Jito Tip Floor</span>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-lg font-mono text-white">0.05</span><span className="text-[10px] font-mono text-blue-500">SOL</span>
              </div>
            </div>
            <div className="bg-[#050505] border border-slate-800 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Oracle Sync</span>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-sm font-mono text-white">PYTH</span><span className="text-[10px] font-mono text-purple-500">PULL</span>
              </div>
            </div>
            <div className="bg-[#050505] border border-slate-800 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Revert Protocol</span>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-sm font-mono text-red-400">ATOMIC</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleCryptographicIgnition} disabled={isExecuting} className="w-full bg-white text-black font-mono text-sm py-4 hover:bg-teal-400 transition-colors flex items-center justify-center space-x-2">
          <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
          <span>{isExecuting ? "[ EXECUTING OMNICHAIN SETTLEMENT... ]" : "AUTHORIZE KINETIC INTENT [NEAR MPC]"}</span>
        </button>
      </div>
    </div>
  );
};
