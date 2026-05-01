import axios, { AxiosInstance } from 'axios';

/** 
 * [UNIVERSAL SOCKET]: Institutional-grade execution harness.
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

  constructor(apiKey: string, baseURL: string = 'https://api.spacedeck.xyz/api/v1') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * [SOCKET]: Submits a pre-compiled GoldenPayload to the Settlement Fabric.
   */
  async executeStrike(request: ExecutionRequest): Promise<any> {
    const { data } = await this.client.post('/strike', request);
    return data;
  }
}
