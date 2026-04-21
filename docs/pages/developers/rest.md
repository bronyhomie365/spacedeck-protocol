# Custom REST Integration

For custom agentic systems not using Eliza or Zerebro, Spacedeck provides a universal REST API.

## Base URL
```text
https://api.spacedeck.xyz/api/v1
```

## Recommended Workflow

### 1. Resonance Check
Verify that your agent can reach the Spacedeck manifold.
```bash
curl "$SPACEDECK_API_BASE/status" \
  -H "Authorization: Bearer $SPACEDECK_AGENT_KEY"
```

### 2. Intent Parsing
Send raw natural language to receive a structured **GoldenPayload**.
```bash
curl -X POST "$SPACEDECK_API_BASE/parse_intent" \
  -H "Authorization: Bearer $SPACEDECK_AGENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "raw_prompt": "Move 50k USDC to Kamino",
    "wallet_id": "0x..."
  }'
```

### 3. Execution Strike
Sign the GoldenPayload (if using Live mode) and submit it for settlement.
*   **Sandbox (sk_test_):** No signature required.
*   **Live (sk_live_):** Requires EIP-712 typed signature for **intent** authorization (capital is pre-authorized via EIP-2612 Permit).

---
For full JSON schemas, see the [API Reference](/reference/api).
