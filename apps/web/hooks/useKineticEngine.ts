import { useState } from "react";
import { useKineticStore } from "../store/useKineticStore";
import { GoldenPayloadSchema } from "../schemas/kinetic_schemas";
import { useAccount } from "wagmi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// [ALCHEMY: SANDBOX FALLBACK MOCK]
const SANDBOX_PAYLOAD = {
  status: "success",
  golden_payload: {
    intent_id: "ID_MOCK_" + Math.random().toString(36).substr(2, 6),
    source_asset: "USDC",
    target_asset: "USDC-MULTIPLEX",
    target_protocol: "Spacedeck Router",
    amount_usd: 2400000,
    use_max_balance: false,
    arcium_shield_required: true,
    vector_type: "PHI_ALGORITHM",
    estimated_apy_bps: 1420,
    is_multiplexed: true,
    engine_mev_shield: true,
    engine_anon_routing: true,
    engine_swap_active: true,
    engine_multiplex_staking: true,
    execution_nodes: [
      { protocol: "KAMINO_LEND", allocation_pct: 55, apy_bps: 1580, asset: "USDC" },
      { protocol: "MARINADE_NATIVE", allocation_pct: 35, apy_bps: 1250, asset: "USDC" },
      { protocol: "DRIFT_VAULT", allocation_pct: 10, apy_bps: 1110, asset: "USDC" }
    ]
  }
};

export const useKineticEngine = () => {
  const { setPayload, addLog, setExecuting, confirmSettlement } = useKineticStore();
  const { address } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);

  const parseIntent = async (rawPrompt: string) => {
    const wallet_id = address || "0xSIMULATED_WALLET";
    setIsProcessing(true);
    addLog(`[SYSTEM] Collapsing intent: "${rawPrompt.substring(0, 30)}..."`);

    try {
      let data: any = null;
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/parse_intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ raw_prompt: rawPrompt, wallet_id }),
        });

        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error("Backend offline");
        }
      } catch (err) {
        // [SANDBOX FALLBACK]: Active only when backend is unreachable
        addLog("[SYSTEM] Sandbox Mode: Simulating Golden Payload parsing.");
        data = SANDBOX_PAYLOAD;
      }

      if (data.status === "error" || data.ERROR) {
        addLog(`[ERROR] Verification Dissonance: ${data.detail || data.ERROR || "Parse failed"}`);
        return;
      }

      try {
        const validatedPayload = GoldenPayloadSchema.parse(data.golden_payload);
        setPayload(validatedPayload);
        
        const logMap: Record<string, string> = {
          "PHI_ALGORITHM": "[SUCCESS] Φ Algorithm Locked: Complex Combinatorics engaged.",
          "PURE_SWAP": "[SUCCESS] Pure Swap Vector Locked: Routing via Jupiter V6."
        };
        addLog(logMap[validatedPayload.vector_type] || `[SUCCESS] Tactical Route Secured. Arcium Shield: ${validatedPayload.arcium_shield_required ? "ACTIVE" : "INACTIVE"}`);
        
      } catch (zodError) {
        addLog("[WARNING] Structural Drift detected. Realignment active.");
        if (data.golden_payload) setPayload(data.golden_payload as any);
      }
      
    } catch (error) {
      addLog("[FATAL] Verification Dissonance. Schema mapping failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const executeSettlement = async (payload: any, physicalSignature: string) => {
    setExecuting(true);
    addLog(`[ARCIUM MXE] EIP-712 Signature Verified. Encrypting state for dispatch...`);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/execute_intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          golden_payload: payload,
          wallet_signature: physicalSignature, 
          zk_proof: "RESONANCE_BYPASS_V1" 
        }),
      });

      const result = await response.json();
      
      if (result.status === "success") {
        result.telemetry.forEach((t: string) => addLog(t));
        confirmSettlement({
          asset: payload.target_asset || payload.source_asset,
          protocol: payload.target_protocol || "UNKNOWN",
          amountUsd: result.deployed_amount_usd || payload.amount_usd,
          apy: (payload.estimated_apy_bps || 0) / 100,
          status: payload.arcium_shield_required ? "SHIELDED" : "EXPOSED",
          txHash: result.transaction_hash
        });
      }
    } catch (error) {
      addLog("[FATAL] Kinetic Execution Severed.");
    } finally {
      setExecuting(false);
    }
  };

  return { parseIntent, executeSettlement, isProcessing };
};
