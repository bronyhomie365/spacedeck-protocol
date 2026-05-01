"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrystallineBorder } from './ui/CrystallineBorder';
import { useKineticStore } from '../store/useKineticStore';
import { cn } from './ui/primitives';

interface BudgetDelegationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetDelegationModal: React.FC<BudgetDelegationModalProps> = ({ isOpen, onClose }) => {
  const [budget, setBudget] = useState(10000);
  const [duration, setDuration] = useState('7d');
  const [selectedWallet, setSelectedWallet] = useState('phantom');
  const setDelegated = useKineticStore((state) => state.setDelegated);

  const handleInitialize = () => {
    setDelegated(true);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-[540px] p-[2px] rounded-[2.5rem] overflow-hidden"
          >
            <CrystallineBorder borderRadius="2.5rem" />
            
            <div className="relative w-full bg-[#020617]/80 backdrop-blur-[80px] p-10 rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              {/* FROSTED NOISE LAYER */}
              <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay rounded-[2.5rem]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='frostedNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23frostedNoise)'/%3E%3C/svg%3E")` }} />
              
              {/* HEADER */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#b7c8ff] animate-pulse shadow-[0_0_12px_#b7c8ff]" />
                  <span className="text-[#b7c8ff] text-[10px] uppercase tracking-[0.3em] font-black" style={{ fontFamily: 'var(--font-microgramma)' }}>
                    PDA Budget Delegation
                  </span>
                </div>
                <h2 className="text-[28px] font-bubbly text-white leading-tight tracking-tight">
                  Authorize Your Agent
                </h2>
              </div>

              {/* CONTENT */}
              <div className="relative z-10 space-y-8">
                {/* VAULT SELECTION */}
                <div className="space-y-4">
                  <label className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'var(--font-microgramma)' }}>
                    Select Treasury Vault
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['phantom', 'backpack'].map((wallet) => (
                      <div 
                        key={wallet}
                        onClick={() => setSelectedWallet(wallet)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 cursor-pointer",
                          selectedWallet === wallet 
                            ? "bg-[#b7c8ff]/10 border-[#b7c8ff]/40 shadow-[0_0_20px_rgba(183,200,255,0.1)]" 
                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                        )}
                      >
                        <div className="w-6 h-6 rounded-full bg-white/10" /> {/* Placeholder for wallet icon */}
                        <span className="text-white text-[11px] font-bubbly capitalize">{wallet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BUDGET SLIDER */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label htmlFor="budget-slider" className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'var(--font-microgramma)' }}>
                      Budget Ceiling (USDC)
                    </label>
                    <span className="text-[#b7c8ff] text-[18px] font-bubbly">
                      ${budget.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    id="budget-slider"
                    aria-label="Budget Ceiling Amount"
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#b7c8ff]"
                  />
                  <div className="flex justify-between text-white/20 text-[9px] font-bold">
                    <span>1K</span>
                    <span>25K</span>
                    <span>50K</span>
                  </div>
                </div>

                {/* DURATION TOGGLE */}
                <div className="space-y-4">
                  <label className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'var(--font-microgramma)' }}>
                    Authorization Window
                  </label>
                  <div className="flex p-1 rounded-2xl bg-white/[0.02] border border-white/5">
                    {['24h', '7d', '30d'].map((d) => (
                      <button 
                        key={d}
                        onClick={() => setDuration(d)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-[10px] font-bold transition-all duration-300",
                          duration === d 
                            ? "bg-[#b7c8ff]/20 text-[#b7c8ff] shadow-sm" 
                            : "text-white/40 hover:text-white/60"
                        )}
                      >
                        {d.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FOOTER ACTION */}
                <button 
                  onClick={handleInitialize}
                  className="w-full py-5 mt-4 rounded-2xl bg-[#b7c8ff] text-[#020617] font-black text-[12px] uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(183,200,255,0.4)] hover:shadow-[0_0_50px_rgba(183,200,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-microgramma)' }}
                >
                  Initialize Delegation
                </button>
              </div>

              {/* CLOSE BUTTON */}
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 text-white/20 hover:text-white/60 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
