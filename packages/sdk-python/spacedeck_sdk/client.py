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

class SpacedeckVessel:
    """[UNIVERSAL SOCKET]: Institutional-grade keyless execution harness."""
    def __init__(self, near_account: str, base_url: str = "https://api.spacedeck.network/v1"):
        self.near_account = near_account
        self.base_url = base_url
        self.headers = {
            "X-Near-Account": self.near_account,
            "Content-Type": "application/json"
        }

    async def strike(self, action: str, input_mint: str, output_mint: str, amount: int, max_slippage_bps: int = 10, **kwargs) -> dict:
        """Dispatches deterministic SVM route via Near MPC signature."""
        logger.info(f"[SOCKET] Broadcasting strict intent for {self.near_account} to Spacedeck Engine...")
        
        # Construct the intent payload internally
        payload = {
            "actor": {"near_account": self.near_account},
            "action": {
                "type": action,
                "params": {
                    "input_mint": input_mint,
                    "output_mint": output_mint,
                    "amount": str(amount),
                    "max_slippage_bps": max_slippage_bps
                }
            }
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{self.base_url}/ingress", headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()
