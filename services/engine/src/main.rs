use axum::{
    routing::{get, post},
    Json, Router,
};
use spacedeck_engine::{ExecutionRequest, KineticResponse};
use std::net::SocketAddr;
mod kinetics;
mod jito_client;
use kinetics::KineticHeart;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    // [THERMODYNAMICS]: The High-Throughput Inbound Valve
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/strike", post(process_strike));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("[ORCHESTRATOR] Kinetic Heart beating on {}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> &'static str {
    "RESONANT"
}

async fn process_strike(
    Json(payload): Json<ExecutionRequest>,
) -> Json<KineticResponse> {
    match KineticHeart::process_strike(payload).await {
        Ok(res) => Json(res),
        Err(e) => {
            eprintln!("[KINETIC ERROR] Ignition Failure: {}", e);
            Json(KineticResponse {
                status: "IGNITION_FAILURE".into(),
                tx_hash: None,
                telemetry: vec![format!("[FATAL] Thermodynamic Dissonance: {}", e)],
                siphon_fee_usd: 0.0,
            })
        }
    }
}
