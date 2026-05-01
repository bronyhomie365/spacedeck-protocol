# Spacedeck Protocol 🛰️
### The Keyless Execution Layer for Autonomous Agents on the Solana Virtual Machine

[![Discoverable by Agents](https://img.shields.io/badge/Agentic-Discoverable-teal?style=flat-square)](./llms.txt)
[![Sovereign Architecture](https://img.shields.io/badge/Architecture-Sovereign-slate?style=flat-square)](./docs/INTEGRATION_MANIFOLD.md)
[![SVM-Native](https://img.shields.io/badge/SVM-Mainnet--Ready-orange?style=flat-square)](https://solana.com)
[![Keyless Auth](https://img.shields.io/badge/Auth-Near--MPC-blue?style=flat-square)](https://near.org)

Spacedeck is a high-velocity **Autonomous Settlement Protocol** designed for the Solana Virtual Machine (SVM). It provides the deterministic DeFi infrastructure required for secure Agent-to-Agent (A2A) and Machine-to-Machine (M2M) capital routing. 

By decoupling algorithmic intelligence from cryptographic execution, Spacedeck eliminates the systemic risks of agent-held private keys and public mempool extraction.

---

## ⚡ The Institutional Execution Pipeline

Legacy DeFi infrastructure forces agents to operate local hot wallets and settle through bloated, multi-step public mempools. Spacedeck compresses agentic execution into three deterministic laws of motion, achieving 400ms atomic finality with zero custody liability:

1. **Order Ingress [NEAR MPC]:** Off-chain cryptographic intent authentication. The AI Agent broadcasts a strictly typed JSON intent via a keyless connection. Zero translation drag. Pure programmatic input is validated against institutional schemas without ever exposing private keys to the local agent runtime.
2. **Clearing Enclave [Arcium Dark Pool] *(Phase 2 Roadmap)*:** Isolated PDA delegation. Bonded institutional solvers compete to route the intent inside a parallelized, encrypted state, guaranteeing absolute MEV shielding. The principal never leaves the user's vault until the optimal execution route is mathematically locked.
3. **Atomic Settlement [Jito Block Engine]:** The execution route and Pyth oracle slippage verification are mathematically sealed in a private bundle. Achieving 400ms block finality, the strike either settles perfectly—bypassing the public mempool entirely—or reverts completely with zero capital lost and zero partial fills.

---

## 🏗️ The AI DeFi Supply Chain

Spacedeck sits at Layer 4 of the autonomous economy, serving as the inescapable execution socket between agentic intelligence and institutional fulfillment on Solana.

1.  **Intelligence Layer (L1-L2):** GPU Compute & Foundation Models (OpenAI, DeepSeek).
2.  **Framework Layer (L3):** Agentic OS frameworks (Eliza, Zerebro, Rig).
3.  **THE PRISM (Layer 4):** Spacedeck settles raw agentic intent into strictly-typed SVM instruction sets.
4.  **The Solvers (Layer 5):** Institutional Market Makers fulfilling intent via private Jito bundles.
5.  **The Settlement Layer (L6):** 400ms Finality on the Solana Mainnet.

---

## 🗺️ Repository Architecture

For an exhaustive engineering and integration map, refer to the [**Integration Manifold**](./docs/INTEGRATION_MANIFOLD.md).

| Directory | Component | Pipeline Function |
| :--- | :--- | :--- |
| `/services/engine` | **The Kinetic Heart (Rust)** | Compiles binary SVM transactions and dispatches Jito bundles. |
| `/services/api` | **The Universal Socket** | Receives strictly-typed JSON intents; handles Near MPC threshold signatures. |
| `/packages/contracts` | **The On-Chain Guardian** | Anchor program enforcing PDA Budget Delegation limits and compliance. |
| `/packages/sdk-python` | **Institutional SDK** | High-frequency algorithmic bridge for Python-based data science workflows. |
| `/packages/eliza-plugin` | **Agent Frameworks** | Drop-in deterministic execution backend for the ai16z Eliza framework. |

---

## 🌌 Local Forge & Devnet Ignition

Ensure Docker, Node 20+, and Rust are installed before igniting the local grid.

### 1. Configure the Physical Anchors
The protocol relies on physical mainnet APIs. You must provide your whitelisted Jito keys and Near MPC targets to ensure accurate local resonance.
```bash
cp .env.example .env
# Populate NEAR_ACCOUNT_ID and JITO_SIGNER_KEY
```

### 2. Ignite the Protocol Infrastructure
```bash
# Boot the Universal Socket and Redis persistence layer
docker-compose up -d

# Verify Socket Resonance
curl http://localhost:8080/health
> {"status": "RESONANT", "auth_mode": "NEAR_MPC"}
```

---

## ⚙️ Quickstart: Deterministic SVM Strike

Spacedeck enforces a strict separation of duties between the Treasury (capital authority) and the Agent (execution logic).

### Phase 1: Treasury Authorization (CLI)
The agent cannot execute until the Human Operator sets a mathematical ceiling on-chain. This ensures the agent can never exceed its mandate.
```bash
# Authorize the PDA Budget Ceiling (100,000 USDC limit)
spacedeck-cli delegate --amount 100000 --asset USDC --agent agent.near
```

### Phase 2: Agent Execution (Python)
Once authorized, the autonomous agent commands execution via the SDK layer. Install the SDK directly from the repository source during this pre-ignition phase:

```bash
# Install the Vessel SDK from the physical repository
pip install -e packages/sdk-python
```

The agent issues a strictly-typed JSON payload. NLP parsing and LLM hallucinations are structurally rejected by the socket.
```python
from spacedeck_sdk import SpacedeckVessel

# Initialize the Sovereign Bridge
vessel = SpacedeckVessel(near_account="agent.near")

# Dispatch deterministic SVM route via Near MPC signature
receipt = await vessel.strike(
    action="SWAP",
    input_mint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", # USDC
    output_mint="So11111111111111111111111111111111111111112", # SOL
    amount=100_000,
    max_slippage_bps=10
)

print(f"Finalized in {receipt.latency}ms | Alpha Captured: +{receipt.surplus_bps}bps")
```

---

## ⚖️ License & Disclosure
The Spacedeck Protocol is released under the **Sovereign Open Source License**. 
Execution finality is governed by the laws of physics and the Solana leader schedule. 
