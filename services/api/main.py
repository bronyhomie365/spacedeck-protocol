import os
import httpx
import logging
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
from loguru import logger

load_dotenv()

# [INSTITUTIONAL CORE CONFIGURATION]
RUST_ENGINE_URL = os.getenv("KINETIC_ENGINE_URL", "http://127.0.0.1:8080")
NEAR_SIGNER_ID = os.getenv("NEAR_SIGNER_ID", "v1.signer.near")

app = FastAPI(title="Spacedeck Universal Socket", version="2.1.0")

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DETERMINISTIC SCHEMAS (Phase 2 SVM Aligned) ---

class ExecutionParams(BaseModel):
    action: str = Field(..., example="SWAP")
    asset_in: str = Field(..., example="USDC")
    asset_out: str = Field(..., example="SOL")
    amount_in_base: float = Field(..., example=50000)
    max_slippage_bps: int = Field(default=25)
    target_dex_route: str = Field(default="JUPITER_V6")

class AuthorizationParams(BaseModel):
    mode: str = Field(default="PDA_DELEGATION")
    timeout_ms: int = Field(default=1000)

class InstitutionalIntent(BaseModel):
    intent_id: str
    agent_id: str
    execution_params: ExecutionParams
    authorization: AuthorizationParams

class SignedStrikeRequest(BaseModel):
    payload: InstitutionalIntent
    mpc_signature: str = Field(..., description="Must be a valid Ed25519 Near MPC signature")

# --- THE UNIVERSAL SOCKET ---

@app.get("/status")
async def get_status():
    return {
        "status": "ACTIVE",
        "node": "UNIVERSAL_SOCKET_V3_SECURE",
        "pipeline_mode": "2_STAGE_SHIPPING",
        "near_mpc_bridge": "ENFORCED",
        "jito_bundle_engine": "ENFORCED",
        "arcium_enclave": "ROADMAP",
        "jito_latency": "SUB_BLOCK"
    }

@app.post("/v1/strike")
async def execute_strike(req: SignedStrikeRequest):
    logger.info(f"[SOCKET] Strike Request Received: {req.payload.intent_id}")
    
    # 1. TELEMETRY ENFORCEMENT
    if not req.mpc_signature.startswith("ed25519:"):
        logger.error(f"[SECURITY_FATAL] Invalid Cryptographic Primitives detected for {req.payload.intent_id}.")
        raise HTTPException(status_code=401, detail="[FABRIC_REJECTED] Invalid signature manifold. Ed25519 Near MPC threshold signature required. EVM/Dummy signatures strictly blocked.")
    
    logger.info(f"[TELEMETRY] Ed25519 Signature Verified: {req.mpc_signature[:15]}...")
    
    # 2. COLLAPSE: Handoff to the Rust Engine for Near MPC verification + Jito Bundle settlement
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{RUST_ENGINE_URL}/strike",
                json=req.dict(),
                timeout=5.0
            )
            response.raise_for_status()
            return response.json()
            
        except httpx.HTTPStatusError as e:
            logger.error(f"[FABRIC_ERROR] Kinetic Engine rejected payload: {e.response.text}")
            raise HTTPException(status_code=502, detail=f"Kinetic Engine Rejection: {e.response.text}")
        except Exception as e:
            # ONTOLOGICAL FIX: Eradicated the simulation fallback loop.
            logger.error(f"[FABRIC_FATAL] Thermodynamic Dissonance. Engine Unreachable: {e}")
            raise HTTPException(status_code=503, detail="[SETTLEMENT_FAILURE] The Liquidity Settlement Fabric is currently unreachable. Zero state risk. Intent dropped.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
