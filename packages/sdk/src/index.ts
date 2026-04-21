import axios, { AxiosInstance } from 'axios';

/** 
 * [INSTITUTIONAL LEXICON]: PHASE 2 CALIBRATION
 * Intent Logic Layer (The Prism)
 * Risk & Compliance Sentinel (The ZK-Gate)
 * Liquidity Settlement Fabric (The Siphon)
 */

export interface GoldenPayload {
  intent_id: string;
  source_asset: string;
  target_asset: string;
  amount_usd: number;
  wallet_id: string;
  vector_type: string;
  solver_id?: string;
}

export interface ExecutionRequest {
  payload: GoldenPayload;
  signature: string;
  deadline: number;
}

export class SpacedeckClient {
  private client: AxiosInstance;

  /**
   * [INTENT LOGIC LAYER]: Institutional-grade harness for autonomous capital.
   */
  constructor(apiKey: string, baseURL: string = 'https://api.spacedeck.xyz/api/v1') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.info("[PRISM] Spacedeck TS Client initialized.");
  }

  /**
   * [PRISM LOGIC LAYER]: Refracts natural language into a deterministic Canonical Intent Schema.
   */
  async parseIntent(rawPrompt: string, walletId: string): Promise<GoldenPayload> {
    console.info(`[PRISM] Refracting abstract intent for wallet: ${walletId}`);
    const { data } = await this.client.post<GoldenPayload>('/parse_intent', {
      raw_prompt: rawPrompt,
      wallet_id: walletId
    });
    console.info("[PRISM] Canonical Intent Schema (GoldenPayload) locked.");
    return data;
  }

  /**
   * [RISK & COMPLIANCE SENTINEL]: Submits a strike request for institutional audit and settlement.
   */
  async executeStrike(request: ExecutionRequest): Promise<any> {
    console.info("[SENTINEL] Verifying pre-flight institutional guardrails...");
    const { data } = await this.client.post('/strike', request);
    console.info(`[FABRIC] Settlement finalized via ${data.solver_id || 'institutional_solver'}`);
    return data;
  }
}
