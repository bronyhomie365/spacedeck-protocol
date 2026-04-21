# OPERATIONAL DOCUMENT 03: DEVELOPER RELATIONS & HARNESS INTEGRATION
**Classification:** Marketplace Operations / Demand-Side Management
**Focus:** The procedural pipeline for AI Developers to integrate Spacedeck without friction.
**Format:** Strategic Synthesis // Colosseum Integration.

---

# THE MISSION: COLLAPSE THE BACKEND.
We engineered the **SpaceKit** to collapse the entire Web3 backend into a single execution layer for your autonomous systems. In the Agentic Economy, execution failure is a death sentence. Spacedeck provides the APIs, SDKs, and harnesses required for AI to command on-chain capital without friction, slippage, or human intervention.

### 1. THE DEVELOPER PERSONA
AI Developers range from "Hobbyist Agents" on Twitter to "Institutional Treasury Bots." They require zero-friction execution and absolute capital safety. We monetize the *flow*, not the *software*, by capturing a micro-spread during the solver auction.

---

# THE INTEGRATION PIPELINE (4 STEPS)

### STEP 1: GET YOUR ACCESS TOKEN
Every agent requires a unique Neural Gateway token to authorize intents.
*   **Sandbox Gratification:** `sk_test_...` tokens are available instantly for local development against the **Shadow Execution Bridge**.
*   **Live Upgrade:** Connect your wallet and sign the **EIP-2612 Permit** to authorize your agent's operating budget. This separates the Budget from the Key, ensuring the agent never holds raw private keys.

### STEP 2: SET YOUR ENVIRONMENT
Configure your agent's environment to point to the Spacedeck Kinetic Engine.
**PASTE INTO YOUR TERMINAL:**
```bash
export SPACEDECK_API_BASE="https://api.spacedeck.xyz/api/v1"
export SPACEDECK_AGENT_KEY="sk_live_YOUR_TOKEN"
```

### STEP 3: INSTALL THE HARNESS
Spacedeck provides native plugins for the leading agentic frameworks.
*   **Eliza:** `npm install @spacedeck-protocol/eliza-plugin`
*   **Zerebro:** `npm install @spacedeck-protocol/zerebro-harness`
*   **Rig:** `cargo add spacedeck-rig-sdk`

### STEP 4: VERIFY THE CONNECTION
Run a quick resonance check to ensure your agent can reach the **Intent Parser (The Prism)** and **ZK-Compliance Gate (The Sentinel)**.
```bash
curl "$SPACEDECK_API_BASE/status" \
  -H "Authorization: Bearer $SPACEDECK_AGENT_KEY"
```

---

# 2. RETENTION & ECOSYSTEM GROWTH
Operations must maintain the "Zero-Halt" protocol. If an agent sends an intent and no Solver bids, the developer's agent is "blind." We guarantee liquidity by maintaining a 65+ institutional solver network, ensuring that every "Pollock" prompt results in a "Devin-Grade" strike.

---

### [PHYSICAL VECTORS: ARCHITECTURAL TRUTH]
For maintainers tracking the deterministic reality of the system, the pipeline physically maps to these core nodes:
*   **The Endpoint Router:** `services/api/main.py` (Handles Bearer token validation and routes to physical or shadow execution).
*   **The Sandbox (sk_test):** `services/api/shadow_manifold.py` (Simulates auction, bypasses compliance gates and cryptographic checks for frictionless UX).
*   **The Physical Engine (sk_live):** `services/engine/src/kinetics.rs` (The absolute truth. Processes `process_strike` and `verify_intent_authorization`).

---
Full documentation at **docs.spacedeck.xyz/developers**
