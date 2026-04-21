import httpx
import asyncio
import json
import time
from generate_test_signature import generate_eip2612_signature
from eth_account import Account

# [CONFIGURATION]: Endpoint Parameters
API_URL = "http://localhost:8005/api/v1/strike"
AUDIT_FILE = "tests/automated/Protocol_Audit.json"

async def run_protocol_strike():
    """
    Exhaustive validation of the end-to-end intent-to-settlement flow.
    Triggers a full simulation strike through the Compliance and Logic layers.
    """
    print("\n[PROTOCOL] Starting Core Settlement Validation...")
    
    # 1. SETUP INTENT DATA
    private_key = "0x" + "b" * 64
    acct = Account.from_key(private_key)
    
    payload = {
        "intent_id": f"STRIKE_{int(time.time())}",
        "source_asset": "USDC",
        "target_asset": "SOL",
        "amount_usd": 50000.0, # $50k Strike
        "wallet_id": acct.address,
        "vector_type": "SOLANA"
    }
    
    # 2. GENERATE CRYPTOGRAPHIC AUTHORIZATION
    deadline = int(time.time() + 3600)
    signature = generate_eip2612_signature(
        private_key, 
        acct.address, 
        "0x8c249E3817fF9B4D82812231d5533A753Ba43604", # Spacedeck Settlement Hub
        int(payload["amount_usd"] * 10**6),
        deadline
    )
    
    execution_request = {
        "payload": payload,
        "signature": signature,
        "deadline": deadline
    }
    
    # 3. KINETIC IGNITION
    print(f"[PROTOCOL] Initiating Settlement for Intent {payload['intent_id']}...")
    
    async with httpx.AsyncClient() as client:
        try:
            start_time = time.time()
            response = await client.post(API_URL, json=execution_request, timeout=120.0)
            latency = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                result = response.json()
                print(f"[SUCCESS] Protocol Validated. Latency: {latency:.2f}ms")
                
                # INSTITUTIONAL AUDIT
                audit_entry = {
                    "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                    "status": "VALIDATED",
                    "latency_ms": latency,
                    "intent_id": payload["intent_id"],
                    "tx_hash": result.get("tx_hash"),
                    "surplus_captured_usd": result.get("surplus_capture_usd"),
                    "telemetry": result.get("telemetry")
                }
                
                with open(AUDIT_FILE, "a") as f:
                    f.write(json.dumps(audit_entry) + "\n")
                    
                print(f"[AUDIT] Verification logged to {AUDIT_FILE}")
            else:
                print(f"[FAILURE] Protocol Exception. HTTP {response.status_code}")
                print(response.text)
                
        except Exception as e:
            print(f"[ERROR] Settlement Bridge Offline: {e}")
            print("[HINT] Ensure the Spacedeck Orchestrator (API) and Kinetic Engine are active.")

if __name__ == "__main__":
    asyncio.run(run_protocol_strike())
