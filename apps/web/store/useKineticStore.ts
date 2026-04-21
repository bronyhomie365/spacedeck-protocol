import { create } from 'zustand';
import { KineticPosition, GoldenPayload } from '../schemas/kinetic_schemas';

export type ViewState = "TERMINAL" | "ORBIT" | "LOGS" | "SETTINGS";

interface KineticState {
  positions: KineticPosition[];
  logs: string[];
  activePayload: GoldenPayload | null;
  isExecuting: boolean;
  activeView: ViewState;
  isAgentMode: boolean; // [UI STATE]: Agent Decomposition Trigger
  isSolverMode: boolean;
  activeTruthShard: string | null;

  addLog: (entry: string) => void;
  setPayload: (payload: GoldenPayload) => void;
  clearPayload: () => void;
  setExecuting: (status: boolean) => void;
  confirmSettlement: (position: KineticPosition) => void;
  setView: (view: ViewState) => void;
  setAgentMode: (mode: boolean) => void; // [UI MUTATION]
  setSolverMode: (mode: boolean) => void;
  setTruthShard: (id: string | null) => void;
}

export const useKineticStore = create<KineticState>((set) => ({
  positions: [],
  logs: ["[SYSTEM] Mental OS Kernel Initialized. Omnichain Gateway Ready."],
  activePayload: null,
  isExecuting: false,
  activeView: "TERMINAL", 
  isAgentMode: false,
  isSolverMode: false,
  activeTruthShard: null,

  addLog: (entry) => set((state) => ({ logs: [...state.logs, entry] })),
  setPayload: (payload) => set({ activePayload: payload }),
  clearPayload: () => set({ activePayload: null }),
  setExecuting: (status) => set({ isExecuting: status }),
  setView: (view) => set({ activeView: view }),
  setAgentMode: (mode) => set({ isAgentMode: mode, isSolverMode: false, activeTruthShard: null }),
  setSolverMode: (mode) => set({ isSolverMode: mode, isAgentMode: false, activeTruthShard: null }),
  setTruthShard: (id) => set({ activeTruthShard: id, isAgentMode: false, isSolverMode: false }),
  
  // [SHARD: AUTONOMOUS ROUTING]
  confirmSettlement: (position) => set((state) => ({
    positions: [...state.positions, position],
    activePayload: null,
    isExecuting: false,
    activeView: "ORBIT", // Instantly route the user to their yield dashboard
  })),
}));
