use anyhow::{Result, bail};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Serialize)]
struct JitoBundleRequest {
    jsonrpc: String,
    id: u64,
    method: String,
    params: Vec<Vec<String>>,
}

#[derive(Deserialize)]
struct JitoBundleResponse {
    result: Option<String>,
    error: Option<serde_json::Value>,
}

pub struct JitoClient {
    http_client: Client,
    block_engine_url: String,
}

impl JitoClient {
    pub fn new() -> Self {
        let url = env::var("JITO_BLOCK_ENGINE_URL")
            .unwrap_or_else(|_| "https://mainnet.block-engine.jito.wtf/api/v1/bundles".to_string());
        Self {
            http_client: Client::new(),
            block_engine_url: url,
        }
    }

    /// [PHYSICAL MANIFESTATION]: Dispatch the compiled VersionedTransaction to Jito as a bundle.
    pub async fn send_bundle(&self, serialized_tx_b58: String) -> Result<String> {
        let payload = JitoBundleRequest {
            jsonrpc: "2.0".into(),
            id: 1,
            method: "sendBundle".into(),
            params: vec![vec![serialized_tx_b58]],
        };

        let response = self.http_client
            .post(&self.block_engine_url)
            .json(&payload)
            .send()
            .await?;

        if !response.status().is_success() {
            bail!("[JITO_REJECTED] Block Engine refused the bundle. Status: {}", response.status());
        }

        let parsed: JitoBundleResponse = response.json().await?;
        
        if let Some(err) = parsed.error {
            bail!("[JITO_FATAL] Bundle simulation failed: {:?}", err);
        }

        Ok(parsed.result.unwrap_or_else(|| "UNKNOWN_BUNDLE_ID".to_string()))
    }
}
