"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useWallet } from '../hooks/useWalletShim';
import { useKineticStore } from '../store/useKineticStore';
import { useKineticEngine } from '../hooks/useKineticEngine';

/**
 * [ACTION GATE MODAL]: Self-contained authorization gate.
 * Renders on the back face of the VesselTerminal flip card.
 * Adapts its display based on vector type (ARB vs YIELD).
 */
export const ActionGateModal = () => {
  const { publicKey, signMessage, connected } = useWallet();
  const activePayload = useKineticStore((state) => state.activePayload);
  const clearPayload = useKineticStore((state) => state.clearPayload);
  const { executeSettlement } = useKineticEngine();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!activePayload) return null;

  const isArb = activePayload.vector_type === "PURE_SWAP" && 
    activePayload.execution_nodes?.some((n: any) => n.leg);

  const handleCryptographicIgnition = async () => {
    setIsAuthenticating(true);
    try {
      let mpcSignaturePayload: string;

      if (connected && publicKey && signMessage) {
        const message = new TextEncoder().encode(`SPACEDECK_AUTH_${activePayload.intent_id}`);
        const signatureBytes = await signMessage(message);
        const b64Signature = Buffer.from(signatureBytes).toString('base64');
        mpcSignaturePayload = `ed25519:NearMPC_${b64Signature}`;
      } else {
        mpcSignaturePayload = `ed25519:NearMPC_SANDBOX_${activePayload.intent_id}`;
      }

      await executeSettlement(activePayload, mpcSignaturePayload);
    } catch (err) {
      console.error("[SENTINEL_FATAL] Ignition aborted:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleAbort = () => {
    clearPayload();
  };

  const displayNodes = activePayload.execution_nodes || [];

  // Calculate arb capture for display
  const arbCapture = isArb && displayNodes.length >= 2 
    ? (() => {
        const buyNode = displayNodes.find((n: any) => n.leg === 'BUY');
        const sellNode = displayNodes.find((n: any) => n.leg === 'SELL');
        if (buyNode?.price && sellNode?.price) {
          const spread = sellNode.price - buyNode.price;
          const units = activePayload.amount_usd / buyNode.price;
          return { spread, capture: Math.floor(spread * units), buyPrice: buyNode.price, sellPrice: sellNode.price };
        }
        return null;
      })()
    : null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 relative overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <ShieldAlert size={16} className="text-[#b7c8ff]" />
          <span 
            className="text-[9px] uppercase tracking-[0.25em] text-[#b7c8ff]"
            style={{ fontFamily: 'var(--font-microgramma), sans-serif', fontWeight: 900 }}
          >
            {isArb ? "Cross-Venue Arbitrage" : "Settlement Authorization"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#4fd1c5] bg-[#4fd1c5]/10 px-2.5 py-1 rounded-full border border-[#4fd1c5]/20" style={{ fontFamily: 'var(--font-microgramma)' }}>
            {activePayload.vector_type || "UNKNOWN"}
          </span>
          <button onClick={handleAbort} className="text-white/30 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* PAYLOAD CONTENT - Adapts to ARB vs YIELD */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        
        {isArb && arbCapture ? (
          // === ARB VIEW: 2-leg execution with prices ===
          <>
            {/* SPREAD HERO */}
            <div className="bg-[#4fd1c5]/5 border border-[#4fd1c5]/20 rounded-2xl p-5 text-center">
              <div className="text-[9px] text-[#4fd1c5]/60 uppercase tracking-[0.2em] mb-1" style={{ fontFamily: 'var(--font-microgramma)' }}>Projected Capture</div>
              <div className="text-[#4fd1c5] font-bold text-3xl">+${arbCapture.capture.toLocaleString()}</div>
              <div className="text-white/30 text-[11px] font-mono mt-1">{(activePayload.estimated_apy_bps! / 10).toFixed(1)} bps on ${(activePayload.amount_usd / 1000000).toFixed(1)}M</div>
            </div>

            {/* ARB LEGS */}
            <div className="space-y-2">
              <div className="text-[9px] text-[#b7c8ff]/50 uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-microgramma)' }}>
                Execution Legs
              </div>
              {displayNodes.map((node: any, idx: number) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${
                      node.leg === 'BUY' ? 'text-[#4fd1c5] bg-[#4fd1c5]/10' : 'text-[#b7c8ff] bg-[#b7c8ff]/10'
                    }`} style={{ fontFamily: 'var(--font-microgramma)' }}>
                      {node.leg}
                    </div>
                    <span className="text-white/60 font-mono text-[12px]">{node.venue || node.protocol}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-mono text-[13px] font-bold">${node.price?.toFixed(2)}</span>
                    <span className="text-white/20 text-[10px]">{node.allocation_pct}%</span>
                  </div>
                </motion.div>
              ))}
              
              {/* SPREAD LINE */}
              <div className="flex items-center justify-center gap-3 py-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4fd1c5]/30 to-transparent" />
                <span className="text-[10px] text-[#4fd1c5] font-mono flex items-center gap-1">
                  <TrendingUp size={12} />
                  Δ ${arbCapture.spread.toFixed(2)} spread
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4fd1c5]/30 to-transparent" />
              </div>
            </div>

            {/* EXECUTION PARAMS */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Slippage", value: `${activePayload.slippage_tolerance_bps || 15} bps` },
                { label: "Bundle", value: "2-leg atomic" },
                { label: "Latency", value: "~380ms" },
              ].map((param, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-3 text-center">
                  <div className="text-[8px] text-white/30 uppercase tracking-[0.15em] mb-0.5" style={{ fontFamily: 'var(--font-microgramma)' }}>{param.label}</div>
                  <div className="text-white/80 font-mono text-[11px]">{param.value}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // === YIELD VIEW: Multi-venue allocation ===
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                <div className="text-[9px] text-[#b7c8ff]/60 uppercase tracking-[0.2em] mb-1" style={{ fontFamily: 'var(--font-microgramma)' }}>Source</div>
                <div className="text-white font-bold text-lg">{activePayload.source_asset || "USDC"}</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                <div className="text-[9px] text-[#b7c8ff]/60 uppercase tracking-[0.2em] mb-1" style={{ fontFamily: 'var(--font-microgramma)' }}>Amount</div>
                <div className="text-white font-bold text-lg">${activePayload.amount_usd?.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <div className="text-[9px] text-[#b7c8ff]/60 uppercase tracking-[0.2em] mb-1" style={{ fontFamily: 'var(--font-microgramma)' }}>Blended APY</div>
              <div className="text-[#4fd1c5] font-bold text-2xl">{((activePayload.estimated_apy_bps || 0) / 100).toFixed(1)}%</div>
            </div>

            {displayNodes.length > 0 && (
              <div className="space-y-2">
                <div className="text-[9px] text-[#b7c8ff]/50 uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-microgramma)' }}>
                  Allocation Nodes
                </div>
                {displayNodes.map((node: any, idx: number) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-white/70 font-mono text-[11px]">{node.protocol}</span>
                    <div className="flex gap-4 text-[10px]">
                      <span className="text-white/40">{node.allocation_pct}%</span>
                      <span className="text-[#4fd1c5]">{(node.apy_bps / 100).toFixed(1)}% APY</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* COMPLIANCE MATRIX */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            { label: "MEV Shield", active: activePayload.engine_mev_shield },
            { label: "Jito Bundle", active: activePayload.engine_swap_active },
            { label: "PDA Delegation", active: true },
            { label: isArb ? "Atomic Settle" : "Multiplex", active: isArb || activePayload.engine_multiplex_staking },
          ].map((flag, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
              <div className={`w-1.5 h-1.5 rounded-full ${flag.active ? 'bg-[#4fd1c5]' : 'bg-white/20'}`} />
              <span className={flag.active ? 'text-[#4fd1c5]' : 'text-white/30'}>{flag.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3 mt-5">
        <button 
          onClick={handleAbort}
          className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all text-[10px] uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-microgramma)' }}
        >
          Abort
        </button>
        <motion.button 
          onClick={handleCryptographicIgnition}
          disabled={isAuthenticating}
          className={`flex-1 px-4 py-3 rounded-xl border transition-all disabled:opacity-50 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 ${
            isArb 
              ? 'bg-[#4fd1c5]/10 border-[#4fd1c5]/30 text-[#4fd1c5] hover:bg-[#4fd1c5]/20' 
              : 'bg-[#b7c8ff]/10 border-[#b7c8ff]/30 text-[#b7c8ff] hover:bg-[#b7c8ff]/20'
          }`}
          style={{ fontFamily: 'var(--font-microgramma)' }}
          whileTap={{ scale: 0.97 }}
        >
          <Zap size={14} />
          {isAuthenticating ? "Authorizing..." : connected ? "Authorize Strike" : "Simulate Strike"}
        </motion.button>
      </div>
    </div>
  );
};
