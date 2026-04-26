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
    """[UNIVERSAL SOCKET]: Institutional-grade execution harness."""
    def __init__(self, api_key: str, base_url: str = "https://api.spacedeck.xyz/api/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}

    async def execute_strike(self, request: ExecutionRequest) -> dict:
        """Submits a pre-compiled GoldenPayload to the Settlement Fabric."""
        logger.info("[SOCKET] Broadcasting strict intent to Spacedeck Engine...")
        async with httpx.AsyncClient() as client:
            # Note: request is already a Pydantic model
            response = await client.post(f"{self.base_url}/strike", headers=self.headers, json=request.dict())
            response.raise_for_status()
            return response.json()
