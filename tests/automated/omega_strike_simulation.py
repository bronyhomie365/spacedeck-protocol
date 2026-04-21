import httpx
import asyncio
import json
import time
from generate_test_signature import generate_eip2612_signature
from eth_account import Account

# [KINEMATICS]: Endpoint Configuration
API_URL = "http://localhost:8005/api/v1/strike"
AUDIT_FILE = "tests/automated/Omega_Audit.json"

async def run_omega_strike():
    """
    [EXHAUSTIVE]: Recursive Manifold Validation Strike.
    Triggers a full intent-to-settlement flow via the containerized Dual-CORE.
    """
    print("\n[OMEGA] Starting Recursive Manifold Validation...")
    
    # 1. SETUP TETRYONIC DATA
    private_key = "0x" + "b" * 64
    acct = Account.from_key(private_key)
    
    payload = {
        "intent_id": f"OMEGA_{int(time.time())}",
        "source_asset": "USDC",
        "target_asset": "SOL",
        "amount_usd": 50000.0, # $50k Strike
        "wallet_id": acct.address,
        "vector_type": "DARK_POOL"
    }
    
    # 2. GENERATE CRYPTOGRAPHIC SEAL
    deadline = int(time.time() + 3600)
    signature = generate_eip2612_signature(
        private_key, 
        acct.address, 
        "0x8c249E3817fF9B4D82812231d5533A753Ba43604", # Spacedeck Clearinghouse
        int(payload["amount_usd"] * 10**6),
        deadline
    )
    
    execution_request = {
        "payload": payload,
        "signature": signature,
        "deadline": deadline
    }
    
    # 3. KINETIC IGNITION
    print(f"[OMEGA] Igniting Intent {payload['intent_id']}...")
    
    async with httpx.AsyncClient() as client:
        try:
            start_time = time.time()
            response = await client.post(API_URL, json=execution_request, timeout=120.0)
            latency = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                result = response.json()
                print(f"[SUCCESS] Manifold Resonant. Latency: {latency:.2f}ms")
                
                # FORENSIC LOGGING
                audit_entry = {
                    "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                    "status": "RESONANT",
                    "latency_ms": latency,
                    "intent_id": payload["intent_id"],
                    "tx_hash": result.get("tx_hash"),
                    "siphon_captured_usd": result.get("siphon_fee_usd"),
                    "telemetry": result.get("telemetry")
                }
                
                with open(AUDIT_FILE, "a") as f:
                    f.write(json.dumps(audit_entry) + "\n")
                    
                print(f"[FORENSIC] Audit logged to {AUDIT_FILE}")
            else:
                print(f"[FAILURE] Dissonance detected. HTTP {response.status_code}")
                print(response.text)
                
        except Exception as e:
            print(f"[ERROR] Connection Severed: {e}")
            print("[HINT] Ensure the Docker-Compose containers ('api' and 'engine') are running.")

if __name__ == "__main__":
    asyncio.run(run_omega_strike())
