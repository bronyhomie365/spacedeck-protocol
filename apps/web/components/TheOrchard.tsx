"use client";
import { motion } from "framer-motion";
import { useKineticStore } from "../store/useKineticStore";
import { ShieldCheck, Activity, ArrowUpRight, ExternalLink } from "lucide-react";
import { CrystallineBorder } from './ui/CrystallineBorder';

export const TheOrchard = () => {
  const { positions } = useKineticStore();

  // [SHARD: DETERMINISTIC AGGREGATION]
  const totalTvl = positions.reduce((acc, pos) => acc + pos.amountUsd, 0);

  const blendedApy = totalTvl > 0
    ? positions.reduce((acc, pos) => acc + (pos.apy * (pos.amountUsd / totalTvl)), 0)
    : 0;

  const totalYieldProjected = totalTvl * (blendedApy / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto pt-10 pb-32"
    >
      {/* MACRO TELEMETRY HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* TILE 1: OMNICHAIN TVL */}
        <div className="relative p-8 flex flex-col items-center justify-center text-center overflow-hidden group rounded-[24px] bg-black/40 backdrop-blur-[80px] shadow-[0_0_32px_rgba(0,0,0,0.8)]">
          {/* SHIMMERING BORDER: 1:1 Crystalline Edge */}
          <CrystallineBorder />
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity z-10">
            <Activity className="w-24 h-24 text-white" />
          </div>
          <div className="sis-stat-value mb-2 relative z-40" style={{ color: "white", textShadow: "0 0 15px rgba(255,255,255,0.4)" }}>
            ${totalTvl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] font-medium font-questrial flex items-center gap-2 relative z-40" style={{ color: `#b7c8ff80` }}>
            <Activity className="w-4 h-4 text-[#b7c8ff]" /> OMNICHAIN TVL
          </div>
        </div>

        {/* TILE 2: BLENDED APY */}
        <div className="relative p-8 flex flex-col items-center justify-center text-center overflow-hidden group rounded-[24px] bg-black/40 backdrop-blur-[80px] shadow-[0_0_32px_rgba(0,0,0,0.8)]">
          {/* SHIMMERING BORDER: 1:1 Crystalline Edge */}
          <CrystallineBorder delay={3.3} />
          <div className="sis-stat-value mb-2 relative z-40" style={{ color: "#b7c8ff", textShadow: "0 0 15px rgba(183,200,255,0.4)" }}>
            {blendedApy.toFixed(2)}%
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] font-medium font-questrial relative z-40" style={{ color: `#b7c8ff80` }}>
            BLENDED APY (Φ GEOMETRY)
          </div>
        </div>

        {/* TILE 3: PROJECTED ANNUAL YIELD */}
        <div className="relative p-8 flex flex-col items-center justify-center text-center overflow-hidden group rounded-[24px] bg-black/40 backdrop-blur-[80px] shadow-[0_0_32px_rgba(0,0,0,0.8)]">
          {/* SHIMMERING BORDER: 1:1 Crystalline Edge */}
          <CrystallineBorder delay={6.6} />
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity z-10">
            <ArrowUpRight className="w-24 h-24 text-[#b7c8ff]" />
          </div>
          <div className="sis-stat-value mb-2 relative z-40" style={{ color: "white", textShadow: "0 0 15px rgba(255,255,255,0.4)" }}>
            +${totalYieldProjected.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] font-medium font-questrial relative z-40" style={{ color: `#b7c8ff80` }}>
            PROJECTED ANNUAL YIELD
          </div>
        </div>
      </div>

      {/* MICRO TELEMETRY: ACTIVE VECTORS */}
      <h3 className="text-[#b7c8ff] text-[10px] tracking-[0.4em] font-bold mb-6 border-b border-white/10 pb-3 flex items-center gap-2 uppercase font-microgramma">
        ACTIVE DEPLOYMENT VECTORS
      </h3>

      {positions.length === 0 ? (
        <div className="text-center py-16 rounded-[24px] border-[2px] border-dashed border-[#b7c8ff]/20 text-[#b7c8ff]/60 tracking-widest text-[12px] font-questrial uppercase bg-black/20 shadow-[inset_0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[12px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#b7c8ff]/5 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            NO CAPITAL DEPLOYED.<br/>WAITING FOR AUTONOMOUS CASH FLOW
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {positions.map((pos, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="sis-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-[#b7c8ff]/30 transition-all font-questrial"
            >
              <div className="flex flex-col mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-bold text-[18px] text-white uppercase tracking-wide">{pos.protocol}</span>
                  {pos.status === "SHIELDED" && (
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-microgramma bg-[#b7c8ff]/10 text-[#b7c8ff] px-2.5 py-1 rounded border border-[#b7c8ff]/30">
                      <ShieldCheck className="w-3 h-3" /> ARCIUM MXE
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-[#b7c8ff]/60 flex items-center gap-2 font-mono">
                  TX: <span className="text-slate-400">{pos.txHash.substring(0, 16)}...</span>
                  <a 
                    href={`https://solscan.io/tx/${pos.txHash}?cluster=devnet`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#b7c8ff] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 cursor-pointer" />
                  </a>
                </div>
              </div>

              <div className="flex gap-10 text-right">
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-[#b7c8ff]/60 tracking-[0.2em] font-microgramma uppercase mb-1">Deployed</span>
                  <span className="font-bold text-[18px] text-white tracking-wide">
                    ${pos.amountUsd.toLocaleString()} <span className="text-[#b7c8ff] text-[12px] uppercase ml-1">{pos.asset}</span>
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-[#b7c8ff]/60 tracking-[0.2em] font-microgramma uppercase mb-1">Yield</span>
                  <span className="font-bubbly text-[22px]" style={{ color: "#b7c8ff", textShadow: "0 0 10px rgba(183,200,255,0.4)" }}>
                    {pos.apy.toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
