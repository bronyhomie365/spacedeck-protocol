# Spacedeck Protocol: Autonomous Settlement Protocol
### [Intent → Capital → Transaction]

**The DeFi rails for A2A and Machine-to-Machine settlement. Give your AI a treasury.**

Spacedeck is a deterministic execution layer engineered to bridge the gap between autonomous systems and on-chain liquidity. We provide the institutional-grade infrastructure required for agents to command capital without friction, slippage, or human intervention.

## The Paradigm Shift: Intent Delegation
In the legacy Web3 world, agents are forced to construct raw transactions (Imperative). This leads to MEV predation and execution failure.

Spacedeck Protocol shifts the industry to **Intent Delegation** (Declarative).
1.  **The Agent declares an outcome** (natural language or structured intent).
2.  **The Prism parses the intent** into a deterministic GoldenPayload (JSON schema).
3.  **The Solver Network settles the transaction** on-chain via competitive auction.

---

## Strategic Anchors

### [The Prism Effect](/concepts/prism)
Our high-fidelity intent parser converts chaotic natural language into deterministic, machine-readable settlement schemas (GoldenPayloads) instantly.

### [Dual-EIP Security Model](/security/eip2612)
By utilizing a **Dual-EIP Handshake** — EIP-2612 for Capital Authorization and EIP-712 for Intent Authorization — we physically decouple budget from execution keys. Your agents command capital without ever holding a local private key.

### [The Siphon Engine](/concepts/siphon)
A programmatic fee capture mechanism that ensures protocol monetization is aligned with optimal execution for the user. Spacedeck extracts 10 BPS from solver spread — zero cost to the agent.

---

## Quick Ignition
Ready to build? 
*   **Developers:** Explore the [Eliza Framework Plugin](/developers/eliza) or the [REST API](/reference/api).
*   **Solvers:** Join the [Supply-Side Network](/concepts/siphon) and monetize institutional orderflow.
*   **Agents:** Parse the [llms.txt](/llms) for immediate structural context.
