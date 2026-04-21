# OPERATIONAL DOCUMENT 01: SOLVER RELATIONS & ONBOARDING FUNNEL
**Classification:** Marketplace Operations / Supply-Side Management
**Focus:** The procedural pipeline for Institutional Solvers to monetize liquidity on Spacedeck.
**Format:** Strategic Synthesis // Colosseum Integration.

---

# THE MISSION: CAPTURE THE SIPHON.
Institutional orderflow is the lifeblood of the Agentic Economy. By joining the Spacedeck Solver Network, you gain direct access to shielded agent intents that require professional-grade execution. Our "Solvers" are elite algorithmic trading firms and institutional market makers who provide the supply side for our autonomous intents.

### 1. THE SOLVER PERSONA
Solvers want high-volume, non-toxic orderflow. We provide standardized JSON payloads (GoldenPayloads); they provide complex on-chain routing math. We do not hold inventory; we route intent.

---

# THE ONBOARDING FUNNEL (4 STEPS)

### STEP 1: DEPLOY THE RELAYER
Spacedeck Solvers operate via local relayer nodes to ensure sub-millisecond latency.
*   **Action:** Deploy the `spacedeckprotocol/relayer-node` Docker container on your proprietary bare-metal or cloud infrastructure.
*   **Rationale:** We enforce local deployment for zero-lag access to the private firehose.

### STEP 2: BOND COLLATERAL
To guarantee execution certainty and institutional trust, every solver must maintain a capital bond.
*   **The Bond:** Deposit **$50,000 USDC** into the `SpacedeckClearinghouse.sol` contract (Sepolia Devnet).
*   **The Guardrail:** This separates professional market makers from amateur bots and acts as collateral against winning an auction but failing to settle.

### STEP 3: CONNECT YOUR ENGINE
Hook your pricing algorithm into the local node's WebSocket stream.
*   **The Firehose:** `wss://localhost:8080/stream/intents`
*   **The Window:** Your engine must respond to a `GoldenPayload` within the **50ms** auction window.

### STEP 4: VERIFY THE STREAM
Run a heartbeat check to ensure your node is synchronized with the **Tiferet Auction House**.
*   **Status:** Confirm `NODE_HEALTH_200` and track your **Siphon Capture** (the profit from dark-pool spread arbitrage via the Solver Auction Marketplace).

---

# 2. PROTOCOL OBLIGATIONS
Spacedeck Operations must guarantee exactly-once delivery of payloads and maintain a deterministic, un-gameable auction sequencer. Any delay in settlement breaks the solver's capital efficiency loop. Instant reimbursement is mandatory.

---
Full documentation at **docs.spacedeck.xyz/solvers**
