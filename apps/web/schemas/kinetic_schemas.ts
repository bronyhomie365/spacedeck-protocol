import { z } from "zod";

// [SHARD: THE GOLDEN PAYLOAD SCHEMA]
// Evolved for Phase 11.6: Continuous Kinetic Flow
export const GoldenPayloadSchema = z.object({
  intent_id: z.string(),
  vector_type: z.enum([
    "DARK_ROUTE", 
    "ASYMMETRIC_YIELD", 
    "PURE_SWAP", 
    "PHI_ALGORITHM",
    "DELTA_NEUTRAL" // Preserving previous phase support
  ]),
  source_asset: z.string().optional(),
  source_asset_mint: z.string().optional(),
  amount_usd: z.number().nonnegative(),
  use_max_balance: z.boolean().optional(),
  target_asset: z.string().optional(),
  target_protocol: z.string().optional(),
  estimated_apy_bps: z.number().optional(),
  slippage_tolerance_bps: z.number().optional(),
  arcium_shield_required: z.boolean().optional(),
  is_multiplexed: z.boolean().optional(),
  is_auto_swap: z.boolean().optional(),
  execution_nodes: z.array(z.any()).optional(),
  wallet_id: z.string().optional(),
  // Engine Visual Flags
  engine_mev_shield: z.boolean().optional(),
  engine_anon_routing: z.boolean().optional(),
  engine_swap_active: z.boolean().optional(),
  engine_multiplex_staking: z.boolean().optional(),
});

export type GoldenPayloadType = z.infer<typeof GoldenPayloadSchema>;
