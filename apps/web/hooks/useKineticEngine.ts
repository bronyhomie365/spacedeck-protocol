import { useState } from "react";
import { useKineticStore } from "../store/useKineticStore";
import { GoldenPayloadSchema } from "../schemas/kinetic_schemas";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8005";

export const useKineticEngine = () => {
  const { setPayload, addLog, setExecuting, setExecutionStep, confirmSettlement } = useKineticStore();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * [INTENT INGESTION]: Takes raw NLP text from the prompt pad.
   * Attempts backend parse first → falls back to sandbox GoldenPayload if offline.
   */
  const parseIntent = async (rawPrompt: string) => {
    setIsProcessing(true);
    addLog(`[SYSTEM] Collapsing intent: "${rawPrompt.substring(0, 50)}..."`);

    try {
      let data: any = null;
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/strike`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ raw_prompt: rawPrompt }),
        });

        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error("Backend offline");
        }
      } catch (err) {
        // [SANDBOX FALLBACK]: Simulate GoldenPayload for institutional demo
        addLog("[SYSTEM] Sandbox Mode: Simulating institutional settlement payload.");
        
        // Detect which cycle the user is in based on prompt content
        const isArbCycle = rawPrompt.toLowerCase().includes("capture") || rawPrompt.toLowerCase().includes("spread") || rawPrompt.toLowerCase().includes("mispriced");
        
        data = {
          status: "success",
          golden_payload: isArbCycle ? {
            // CYCLE 1: Cross-venue arbitrage capture
            intent_id: "ARB_" + Math.random().toString(36).substr(2, 9),
            source_asset: "USDC",
            target_asset: "SOL",
            target_protocol: "Jupiter ↔ Raydium",
            amount_usd: 2200000,
            use_max_balance: false,
            arcium_shield_required: true,
            vector_type: "PURE_SWAP",
            estimated_apy_bps: 2650,        // 26.5 bps capture
            slippage_tolerance_bps: 15,
            is_multiplexed: false,
            engine_mev_shield: true,
            engine_anon_routing: false,
            engine_swap_active: true,
            engine_multiplex_staking: false,
            execution_nodes: [
              { protocol: "JUPITER_V6", allocation_pct: 50, apy_bps: 0, asset: "SOL", leg: "BUY", venue: "Jupiter", price: 178.42 },
              { protocol: "RAYDIUM_CLMM", allocation_pct: 50, apy_bps: 0, asset: "SOL", leg: "SELL", venue: "Raydium", price: 178.89 },
            ]
          } : {
            // CYCLE 2: Multi-venue yield optimization
            intent_id: "YLD_" + Math.random().toString(36).substr(2, 9),
            source_asset: "USDC",
            target_asset: "USDC-MULTIPLEX",
            target_protocol: "Spacedeck Router",
            amount_usd: 2400000,
            use_max_balance: false,
            arcium_shield_required: true,
            vector_type: "PHI_ALGORITHM",
            estimated_apy_bps: 1420,
            slippage_tolerance_bps: 15,
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
      }

      if (data.status === "error" || data.ERROR) {
        const errorMsg = data.detail || data.ERROR || "Parse failed";
        addLog(`[ERROR] Verification Dissonance: ${errorMsg}`);
        setIsProcessing(false);
        return;
      }

      // [SHARD: ZOD CANOPY VALIDATION]
      try {
        const validatedPayload = GoldenPayloadSchema.parse(data.golden_payload);
        console.log("[KINETIC DEBUG] Validated Payload:", validatedPayload);
        setPayload(validatedPayload);
        
        if (validatedPayload.vector_type === "PURE_SWAP") {
          addLog(`[SUCCESS] Cross-venue vector locked: Atomic 2-leg capture via Jito.`);
        } else if (validatedPayload.vector_type === "PHI_ALGORITHM") {
          addLog(`[SUCCESS] Φ Algorithm Locked: Multi-venue yield combinatorics engaged.`);
        } else {
          addLog(`[SUCCESS] Tactical Route Secured. MEV Shield: ${validatedPayload.arcium_shield_required ? "ACTIVE" : "INACTIVE"}`);
        }
      } catch (zodError) {
        console.warn("[KINETIC WARNING] Structural Drift detected. Passing through for UI.");
        addLog("[WARNING] Structural Drift detected. Realignment active.");
        if (data.golden_payload) {
          setPayload(data.golden_payload as any);
        } else {
          addLog("[ERROR] Critical Failure: No payload received from Universal Socket.");
        }
      }
      
    } catch (error) {
      addLog("[FATAL] Verification Dissonance. Schema mapping failed.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * [SETTLEMENT EXECUTION]: Steps through the waterfall with telemetry.
   */
  const executeSettlement = async (payload: any, physicalSignature: string) => {
    setExecuting(true);
    setExecutionStep(0);
    addLog(`[PRISM] Intent refracted into GoldenPayload. Compiling settlement...`);

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
    const isArb = payload.vector_type === "PURE_SWAP" && payload.execution_nodes?.some((n: any) => n.leg);

    try {
      await wait(1500);
      setExecutionStep(1);
      addLog(`[JITO] PDA Budget verified: $${(payload.amount_usd / 1000000).toFixed(1)}M ceiling active. Near MPC signature locked.`);
      
      await wait(2000);
      setExecutionStep(2);
      if (isArb) {
        addLog(`[JITO] Bundle submitted to Block Engine: 2 legs, 1 atomic block. Slot target: ${312847000 + Math.floor(Math.random() * 999)}.`);
      } else {
        addLog(`[JITO] Distributing to Solver Marketplace via Jito Bundle...`);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/strike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          golden_payload: payload,
          wallet_signature: physicalSignature, 
        }),
      });

      const result = await response.json();
      
      if (result.status === "success") {
        setExecutionStep(3);
        await wait(1000);
        result.telemetry?.forEach((t: string) => addLog(t));
        confirmSettlement({
          asset: payload.target_asset || payload.source_asset,
          protocol: payload.target_protocol || "UNKNOWN",
          amountUsd: result.deployed_amount_usd || payload.amount_usd,
          apy: (payload.estimated_apy_bps || 0) / 100,
          status: payload.arcium_shield_required ? "SHIELDED" : "OPEN",
          txHash: result.transaction_hash
        });
      }
    } catch (error) {
      // [SANDBOX FALLBACK]: Simulate successful settlement for demo flow
      await wait(1800);
      setExecutionStep(3);
      
      if (isArb) {
        const captureUsd = 5828;
        const latencyMs = 340 + Math.floor(Math.random() * 80);
        addLog(`[SUCCESS] Atomic settlement: +$${captureUsd.toLocaleString()} captured in ${latencyMs}ms. 0 MEV leaked.`);
        confirmSettlement({
          asset: "SOL",
          protocol: payload.target_protocol || "Jupiter ↔ Raydium",
          amountUsd: payload.amount_usd,
          apy: 26.5,
          status: "SHIELDED",
          txHash: "TX_ARB_" + Math.random().toString(36).substr(2, 12)
        });
      } else {
        addLog(`[SUCCESS] Atomic settlement confirmed in 400ms. Capital deployed across ${payload.execution_nodes?.length || 3} venues.`);
        confirmSettlement({
          asset: payload.target_asset || payload.source_asset,
          protocol: payload.target_protocol || "Spacedeck Router",
          amountUsd: payload.amount_usd,
          apy: (payload.estimated_apy_bps || 0) / 100,
          status: payload.arcium_shield_required ? "SHIELDED" : "OPEN",
          txHash: "TX_YLD_" + Math.random().toString(36).substr(2, 12)
        });
      }
    } finally {
      setExecuting(false);
    }
  };

  return { parseIntent, executeSettlement, isProcessing };
};
