# Shadow vs. Physical Execution

Spacedeck Protocol provides two distinct execution manifolds to balance developer velocity with institutional security.

## 1. The Shadow Manifold (sk_test_)
The Shadow Manifold is a zero-risk, high-velocity simulation environment for AI developers. It allows for immediate paper-trading and integration testing without cryptographic overhead.

*   **Authentication:** Requires `sk_test_` API key.
*   **Safety:** Bypasses Gevurah ZK-Compliance and EIP-2612 Permits.
*   **Determinism:** Returns simulated settlement receipts (`0xshadow_...`) that mirror the data structure of live strikes.
*   **Use Case:** Sandbox development, agent logic debugging, and hackathon prototypes.

## 2. The Physical Engine (sk_live_)
The Physical Engine is the production environment for high-mass institutional strikes. It enforces the full thermodynamic and cryptographic laws of the Spacedeck Protocol.

*   **Authentication:** Requires `sk_live_` API key.
*   **Security:** Mandates the **Dual-EIP Handshake** (EIP-2612 Capital Permit + EIP-712 Intent Auth) and **ZK-Compliance Gate**.
*   **Settle:** Executes real on-chain transactions via the **Multi-Solver Network**.
*   **Use Case:** Production treasury management, institutional yield capture, and live agentic DeFi.

---
### Technical Routing
The **Inbound Gateway** (`api_gateway.py`) automatically routes traffic based on the Bearer Token prefix. No endpoint changes are required to move from Shadow to Physical.
