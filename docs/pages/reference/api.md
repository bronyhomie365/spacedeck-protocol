# API Reference: The Universal Grammar

Spacedeck Protocol provides a deterministic REST API for autonomous agents to command capital. All endpoints require a valid Bearer Token in the `Authorization` header.

## Authentication
Every request must include your SpaceKit API Key.
```http
Authorization: Bearer sk_live_...
```
*   **sk_test_**: Routes to the **Shadow Manifold** (Zero-risk simulation).
*   **sk_live_**: Routes to the **Physical Engine** (On-chain execution).

---

## Endpoints

### 1. Resonance Check [GET]
Verify connectivity and synchronization with the Intent Parser (Prism) and ZK-Compliance Gate (Sentinel).
*   **URL:** `/api/v1/status`
*   **Response:**
    ```json
    {
      "status": "ONLINE",
      "resonance": "SYNCHRONIZED",
      "binah_parser": "ACTIVE",
      "gevurah_gate": "ACTIVE",
      "execution_mode": "PHYSICAL_LIVE"
    }
    ```

### 2. Parse Intent [POST]
Collapse abstract natural language into a deterministic **GoldenPayload**.
*   **URL:** `/api/v1/parse_intent`
*   **Request Schema:**
    ```json
    {
      "raw_prompt": "string",  // The natural language intent
      "wallet_id": "string"    // The user's wallet address
    }
    ```
*   **Response (GoldenPayload):**
    ```json
    {
      "status": "success",
      "golden_payload": {
        "intent_id": "string",
        "source_asset": "USDC",
        "amount_usd": 50000.0,
        "target_protocol": "KAMINO",
        "estimated_apy_bps": 1250,
        "arcium_shield_required": true
      }
    }
    ```

### 3. Execute Intent [POST]
Ignite the final strike and settle the capital via the Solver Network.
*   **URL:** `/api/v1/execute_intent`
*   **Request Schema:**
    ```json
    {
      "golden_payload": { ... }, // Object received from /parse_intent
      "wallet_signature": "string", // EIP-712 Intent Authorization signature
      "capital_permit": "string",    // EIP-2612 Capital Permit (set once by Portfolio Manager)
      "zk_proof": "PROVEN"
    }
    ```
*   **Response:**
    ```json
    {
      "status": "SETTLED",
      "tx_hash": "0x...",
      "amount_deployed_usd": 50000.0,
      "protocol_yield_bps": 1250,
      "siphon_fee_usd": 50.0
    }
    ```

---

## Error States
| Code | Reason | Resolution |
| :--- | :--- | :--- |
| **401** | Invalid Token | Check your sk_ key prefix and Authorization header. |
| **403** | Sanctioned Wallet | The Gevurah Gate identified a high-risk origin wallet. |
| **422** | Insufficient Mass | Intent mass must be > $50,000 for Physical Execution. |
