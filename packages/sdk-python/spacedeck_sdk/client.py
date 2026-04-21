import httpx
import logging
from typing import Optional
from .schemas import GoldenPayload, ExecutionRequest

# [INSTITUTIONAL LEXICON]: PHASE 2 CALIBRATION
# Intent Logic Layer (The Prism)
# Risk & Compliance Sentinel (The ZK-Gate)
# Liquidity Settlement Fabric (The Siphon)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("spacedeck_sdk")

class SpacedeckClient:
    """
    [INTENT LOGIC LAYER]: Institutional-grade harness for autonomous capital.
    """
    def __init__(self, api_key: str, base_url: str = "https://api.spacedeck.xyz/api/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        logger.info("[PRISM] Spacedeck Client initialized.")

    async def parse_intent(self, raw_prompt: str, wallet_id: str) -> GoldenPayload:
        """
        Refracts natural language through the Prism Logic Layer to generate a Canonical Intent Schema.
        """
        logger.info(f"[PRISM] Refracting abstract intent for wallet: {wallet_id}")
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/parse_intent",
                headers=self.headers,
                json={"raw_prompt": raw_prompt, "wallet_id": wallet_id}
            )
            response.raise_for_status()
            data = response.json()
            logger.info("[PRISM] Canonical Intent Schema (GoldenPayload) locked.")
            return GoldenPayload(**data)

    async def execute_strike(self, request: ExecutionRequest) -> dict:
        """
        Submits a GoldenPayload to the Liquidity Settlement Fabric via the Compliance Sentinel.
        """
        logger.info("[SENTINEL] Verifying pre-flight institutional guardrails...")
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/strike",
                headers=self.headers,
                json=request.dict()
            )
            response.raise_for_status()
            receipt = response.json()
            logger.info(f"[FABRIC] Settlement finalized via {receipt.get('solver_id', 'unknown_solver')}")
            return receipt
