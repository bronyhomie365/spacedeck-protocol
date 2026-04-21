# ZK-Compliance Gate: The Institutional Shield

Every intent strike within the Spacedeck manifold must pass through the **ZK-Compliance Gate** (Compliance Guardian) before reaching the Solver Network.

## Real-Time Sanctions Gating
Unlike traditional bridges that react after a hack, the Compliance Guardian is a **pre-flight guardian**. It performs an atomic, real-time check of every `wallet_id` against global sanctions lists and toxic liquidity databases.

## Deterministic Risk Scoring
1.  **Identity Verification:** Addresses are mapped against the ZK-Oracle to generate a **Kinetic Risk Score (0-100)**.
2.  **Trade Block:** If an address is flagged as high-risk, the **Entry Gateway** triggers a 403 Forbidden state, mathematically blocking the intent from entering the dark pool.
3.  **Solver Protection:** This ensures that institutional Market Makers are never exposed to toxic flow, maintaining the integrity of the Spacedeck liquidity pool.

## Privacy Preservation
Because the check utilizes **Zero-Knowledge Proofs**, we can verify that a wallet is "Green" without exposing the underlying transaction history or balance metadata to the public mempool.

The Institutional Shield makes Spacedeck the only execution layer capable of handling institutional capital with automated, real-time compliance.
