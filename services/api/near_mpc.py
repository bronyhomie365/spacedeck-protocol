import os
import json
import httpx
from loguru import logger

class NearMPCBridge:
    def __init__(self):
        # [PHYSICAL MAINNET]: Routing strictly to the actual Near RPC network
        self.rpc_url = os.getenv("NEAR_RPC_URL", "https://rpc.mainnet.near.org")
        self.contract_id = os.getenv("NEAR_MPC_CONTRACT", "v1.signer.near")
        self.account_id = os.getenv("NEAR_ACCOUNT_ID")

    async def request_threshold_signature(self, payload_hash: str) -> str:
        if not self.account_id:
            logger.error("[SENTINEL_FATAL] NEAR_ACCOUNT_ID missing. Cannot authorize physical strike.")
            raise ValueError("Physical signature requires configured Near Account ID.")
            
        logger.info(f"[IGNITION] Requesting Ed25519 Threshold Signature for hash: {payload_hash}")
        
        # [PHYSICAL MANIFESTATION]: Constructing the Near RPC payload to call `sign`
        # on the threshold contract, definitively binding the SVM intent to the MPC network.
        rpc_payload = {
            "jsonrpc": "2.0",
            "id": "kinetic_pillar",
            "method": "query",
            "params": {
                "request_type": "call_function",
                "finality": "optimistic",
                "account_id": self.contract_id,
                "method_name": "sign",
                "args_base64": self._encode_args({"payload": payload_hash, "path": "spacedeck_svm_strike_v1"})
            }
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(self.rpc_url, json=rpc_payload, timeout=10.0)
                response.raise_for_status()
                result = response.json()
                
                if "error" in result:
                    logger.error(f"[NEAR_REJECTED] MPC Network denied signature: {result['error']}")
                    raise RuntimeError("[FABRIC_FATAL] MPC Signature Denied by Threshold Network.")

                # Extracting the physical Ed25519 signature from the Near RPC response bytes
                signature_bytes = result.get("result", {}).get("result", [])
                physical_signature = self._decode_signature(signature_bytes)
                
                logger.info("[COLLAPSE] Near MPC Signature Acquired. Cryptographic reality anchored.")
                return f"ed25519:{physical_signature}"
                
            except Exception as e:
                logger.error(f"[SENTINEL_FATAL] Bridging failure to Near RPC: {e}")
                raise

    def _encode_args(self, args: dict) -> str:
        import base64
        return base64.b64encode(json.dumps(args).encode()).decode()

    def _decode_signature(self, byte_array: list) -> str:
        import base58
        return base58.b58encode(bytes(byte_array)).decode()
