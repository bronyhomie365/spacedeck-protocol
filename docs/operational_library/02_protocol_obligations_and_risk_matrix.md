# OPERATIONAL DOCUMENT 02: PROTOCOL OBLIGATIONS & RISK MATRIX
**Classification:** Risk Management / Legal & Financial Operations
**Focus:** Defining the exact boundaries of liability, capital exposure, and operational guarantees for Spacedeck Protocol.

---

# 1. THE LIABILITY BOUNDARY (The "Toll Booth" Doctrine)
Spacedeck Protocol operates strictly as a **Routing and Authorization Middleware**. We are the "Toll Booth" on the AI highway. 

We do not provide trade execution, we do not custody AI capital, and we do not provide algorithmic trading advice.

**Our Core Obligation:** To cryptographically verify that an AI's intent (EIP-712) matches the Human's capital authorization (EIP-2612 Permit), and to route that intent to the highest-bidding Solver for settlement.

# 2. FOUNDER RISK MATRIX

### Risk A: Smart Contract Exploitation (The Clearinghouse)
*   **The Threat:** A vulnerability in `SpacedeckClearinghouse.sol` allows an attacker to drain the $50,000 USDC bonds deposited by the Solvers, or maliciously consume the Human's EIP-2612 Permits.
*   **The Obligation:** We must subject the contract to Tier-1 external audits (e.g., Zellic, OtterSec) before Mainnet deployment.
*   **Mitigation:** The contract logic must remain immutable and minimal. No complex upgradeable proxy patterns unless absolutely necessary for security patches.

### Risk B: Solver Settlement Failure (The Bounced Check)
*   **The Threat:** A Solver wins an auction, executes a trade on Solana using their own capital, but the `ReimbursementEngine` fails to pull the Human's USDC from the Sepolia Clearinghouse due to an RPC failure or invalid Permit. The Solver loses money.
*   **The Obligation:** The protocol must guarantee atomicity. The `AuctionOrchestrator` must mathematically prove the Human's Permit is valid *before* awarding the auction to the Solver.
*   **Mitigation:** If the protocol fails to reimburse a Solver due to a software bug, Spacedeck Protocol's treasury is liable for the delta.

### Risk C: Capital Expenditure (CapEx) Creep
*   **The Threat:** The protocol attempts to host the execution infrastructure for the Solvers, resulting in catastrophic AWS/GCP bills as high-frequency trading volume scales.
*   **The Obligation:** We must strictly enforce the "Bring Your Own Compute" rule. 
*   **Mitigation:** The `SolverPortal` explicitly mandates that Solvers pull the Docker image and deploy it on their own infrastructure. We only scale our lightweight API Gateway.

# 3. THE REVENUE OBLIGATION (The Siphon)
The 10 Basis Point (0.10%) Siphon is the lifeblood of the protocol.
*   **Operational Mandate:** The Siphon must be extracted *programmatically* at the smart contract level during the `settleAuctionAndSiphon` function call. 
*   **Financial Tracking:** We must maintain a real-time dashboard (Tiferet/Netzach telemetry) verifying that Siphon revenue is successfully pooling in the Protocol Treasury address, preventing silent revenue leakage.
