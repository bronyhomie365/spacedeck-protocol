import asyncio
import logging
import sys
import os

# [OMEGA VERIFICATION]: END-TO-END HANDSHAKE AUDIT
# This script verifies the integration of the SDK, API Orchestrator, and Kinetic Engine.

# Add the SDK to the path
sys.path.append(os.path.join(os.getcwd(), "packages", "sdk-python"))
from spacedeck_sdk.client import SpacedeckClient, ExecutionRequest

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger("omega_audit")

async def run_audit():
    logger.info("--- [OMEGA-CTO]: STARTING END-TO-END HANDSHAKE AUDIT ---")
    
    # 1. Initialize Institutional Client
    client = SpacedeckClient(api_key="SIM_PROD_KEY", base_url="http://127.0.0.1:8005/api/v1")
    
    # 2. Refract Intent (Prism Logic Layer)
    logger.info("PHASE 1: Refracting abstract intent through the Prism Logic Layer...")
    try:
        payload = await client.parse_intent(
            raw_prompt="Deposit 100,000 USDC into Kamino on Solana",
            wallet_id="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
        )
        logger.info(f"SUCCESS: Intent Locked as GoldenPayload {payload.intent_id}")
    except Exception as e:
        logger.error(f"FAILURE: Prism Logic Layer dissonance. Error: {e}")
        return

    # 3. Execute Strike (Sentinel & Fabric)
    logger.info("PHASE 2: Executing strike via Risk & Compliance Sentinel...")
    request = ExecutionRequest(
        payload=payload,
        signature="0x6fcf8e51586716ce5932a326a0c5c43d8b2d184a4a50d24f0c43666b6c0e5a594c34a36920e8b15a4e76c1f1092e0787e9e6863574c810f6018c1c4e1f7c9e1c1b",
        deadline=1713456000
    )
    
    try:
        receipt = await client.execute_strike(request)
        logger.info(f"SUCCESS: Handshake Finalized. TX Hash: {receipt.get('tx_hash')}")
        for log in receipt.get('telemetry', []):
            logger.info(f"  INTERNAL_NODE: {log}")
    except Exception as e:
        logger.error(f"FAILURE: Handshake Rail dissonance. Error: {e}")
        return

    logger.info("--- [OMEGA-CTO]: AUDIT COMPLETE. RESONANCE STABLE. ---")

if __name__ == "__main__":
    asyncio.run(run_audit())
