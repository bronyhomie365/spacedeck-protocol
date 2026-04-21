use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TetryonicPayload {
    pub intent_id: String,
    pub source_asset: String,
    pub target_asset: String,
    pub amount_usd: f64,
    pub wallet_id: String,
    pub vector_type: String,
    pub solver_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ExecutionRequest {
    pub payload: TetryonicPayload,
    pub signature: String,
    pub deadline: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct KineticResponse {
    pub status: String,
    pub tx_hash: Option<String>,
    pub telemetry: Vec<String>,
    pub siphon_fee_usd: f64,
}
