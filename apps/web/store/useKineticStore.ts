import { create } from 'zustand';

// [V3 ALIGNED]: Position shape matching the original Glass Ship + V3 pipeline terminology
export interface KineticPosition {
  intent_id?: string;
  protocol: string;
  asset: string;
  amountUsd: number;
  apy: number;
  txHash: string;
  status: "SHIELDED" | "OPEN" | "SETTLED";
}

export interface GoldenPayload {
  intent_id: string;
  source_asset?: string;
  target_asset?: string;
  target_protocol?: string;
  amount_usd: number;
  tx_hash?: string;
  vector_type?: string;
  estimated_apy_bps?: number;
  use_max_balance?: boolean;
  arcium_shield_required?: boolean;
  is_multiplexed?: boolean;
  slippage_tolerance_bps?: number;
  engine_mev_shield?: boolean;
  engine_anon_routing?: boolean;
  engine_swap_active?: boolean;
  engine_multiplex_staking?: boolean;
  execution_nodes?: Array<{
    protocol: string;
    allocation_pct: number;
    apy_bps: number;
    asset: string;
    leg?: string;
    venue?: string;
    price?: number;
  }>;
}

export type ViewState = "TERMINAL" | "ORBIT" | "LOGS" | "SETTINGS";

interface KineticState {
  positions: KineticPosition[];
  logs: string[];
  pendingIntents: string[];
  activePayload: GoldenPayload | null;
  isExecuting: boolean;
  executionStep: number;
  activeView: ViewState;
  isAgentMode: boolean;
  solverMode: boolean;
  truthShard: string | null;
  showAuthModal: boolean;
  isUnlocked: boolean;
  isDelegated: boolean;

  addLog: (entry: string) => void;
  setPayload: (payload: GoldenPayload) => void;
  clearPayload: () => void;
  setExecuting: (status: boolean) => void;
  setExecutionStep: (step: number) => void;
  confirmSettlement: (position: KineticPosition) => void;
  setView: (view: ViewState) => void;
  setAgentMode: (mode: boolean) => void;
  setSolverMode: (mode: boolean) => void;
  setTruthShard: (id: string | null) => void;
  setShowAuthModal: (show: boolean) => void;
  setUnlocked: (unlocked: boolean) => void;
  setDelegated: (delegated: boolean) => void;
  queueStrike: (intent_id: string) => void;
  abortStrike: (intent_id: string) => void;
  setActivePayload: (payload: any | null) => void;
  setActiveView: (view: string) => void;
}

export const useKineticStore = create<KineticState>((set) => ({
  positions: [],
  logs: ["[SYSTEM] Spacedeck Vessel awaits treasury authorization. SVM Gateway ready."],
  pendingIntents: [],
  activePayload: null,
  isExecuting: false,
  executionStep: 0,
  activeView: "TERMINAL",
  isAgentMode: false,
  solverMode: false,
  truthShard: null,
  showAuthModal: false,
  isUnlocked: false,
  isDelegated: false,

  addLog: (entry) => set((state) => ({ logs: [...state.logs, entry] })),
  setPayload: (payload) => set({ activePayload: payload }),
  clearPayload: () => set({ activePayload: null }),
  setExecuting: (status) => set({ isExecuting: status, executionStep: status ? 0 : 0 }),
  setExecutionStep: (step) => set({ executionStep: step }),
  setView: (view) => set({ activeView: view }),
  setAgentMode: (mode) => set({ isAgentMode: mode, solverMode: false, truthShard: null }),
  setSolverMode: (mode) => set({ solverMode: mode, isAgentMode: false, truthShard: null }),
  setTruthShard: (id) => set({ truthShard: id, isAgentMode: false, solverMode: false }),
  setShowAuthModal: (show) => set({ showAuthModal: show }),
  setUnlocked: (unlocked) => set({ isUnlocked: unlocked }),
  setDelegated: (delegated) => set({ isDelegated: delegated }),
  
  // Legacy aliases for backward compatibility
  setActivePayload: (payload) => set({ activePayload: payload }),
  setActiveView: (view) => set({ activeView: view as ViewState }),

  queueStrike: (intent_id) => 
    set((state) => ({
      pendingIntents: [...state.pendingIntents, intent_id]
    })),

  confirmSettlement: (position) => set((state) => ({
    positions: [...state.positions, position],
    activePayload: null,
    isExecuting: false,
    activeView: "ORBIT", // Route user to Capital Dashboard on settlement
  })),

  abortStrike: (intent_id) =>
    set((state) => ({
      pendingIntents: state.pendingIntents.filter(id => id !== intent_id)
    })),
}));
