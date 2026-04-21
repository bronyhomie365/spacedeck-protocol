# OPERATIONAL DOCUMENT 04: CLIENT OBLIGATIONS & CAPITAL GUARDRAILS
**Classification:** User Governance / Risk Management
**Focus:** Defining the responsibilities of the human user (Portfolio Manager) and the mathematical limits of the AI Agent during **Autonomous Transaction Settlement**.

---

# 1. THE USER'S OBLIGATION: BUDGET STEWARDSHIP
While Spacedeck Protocol provides the "Armor," the human user remains the ultimate authority (𐤋).

**Core User Responsibility:** 
The user is responsible for setting a budget that matches their risk tolerance. If a user authorizes a $100,000 budget and their AI agent "hallucinates" a bad trade, the protocol will execute that trade if it passes the ZK-Compliance and Solver Auction rules.

# 2. PROTOCOL GUARDRAILS (The Automatic Shield)
To mitigate human error and agent failure, the protocol enforces the following operational guardrails:

### Guardrail A: The Dual-EIP Handshake
*   **Mechanism:** The protocol utilizes **EIP-2612 (Permit)** for **Capital Authorization** and **EIP-712** for **Intent Authorization**. 
*   **Operational Rationale:** Spacedeck can **physically never** extract more than the amount signed in the Permit. Even if an agent's Intent signature is compromised, the total capital risk is hard-capped by the Permit's mathematical seal.

### Guardrail B: The ZK-Compliance Gate (The Sentinel)
*   **Mechanism:** Every inbound GoldenPayload is checked against global sanction lists (OFAC, HAPI) before it reaches the Settlement Fabric.
*   **Operational Rationale:** To protect the user and the protocol from "Toxic Counterparties." If the AI attempts to trade with a sanctioned address, the valve closes instantly.

### Guardrail C: Velocity & Drift Limits
*   **Mechanism:** Operational limits on how many intents an agent can send per hour and the maximum allowed slippage relative to the global price oracle.
*   **Operational Rationale:** To prevent "Recursive Hallucinations" where a buggy AI sends 1,000 trades in a minute, draining the budget on slippage.

# 3. DISPUTE & RESOLUTION
*   **Trade Finality:** On-chain settlement is final. Because Spacedeck uses an institutional Solver Network with a Siphon, there is no "undo" button once a strike is settled.
*   **Protocol Failure:** If capital is lost due to a verifiable bug in the Spacedeck smart contracts (and not an agent error), the Protocol Treasury is the primary buffer for restitution.

### [PHYSICAL VECTORS: ARCHITECTURAL TRUTH]
For maintainers enforcing these guardrails, the operations physically resolve here:
*   **Intent Authorization (EIP-712):** `services/engine/src/kinetics.rs` (`verify_intent_authorization()`).
*   **Capital Authorization (EIP-2612):** Scoped Token Permits residing in the protocol's clearinghouse or on-chain vault.
*   **The ZK-Compliance Gate:** `services/api/main.py` (Middle-ware orchestrating external oracle pings).

---

# SUMMARY: THE DUAL HANDSHAKE
**Autonomous Transaction Settlement** is a deterministic **Dual Handshake**:
1.  **Human to Protocol:** "I authorize this capital budget." (EIP-2612)
2.  **AI to Protocol:** "I delegate this specific settlement." (EIP-712)

Operations is the steward of this handshake, ensuring it remains secure, compliant, and blazingly fast.
