# STRATEGIC DOCUMENT 03: THE GTM & WORKTREE EXECUTION PLAN
**Classification:** Tactical Roadmap / Developer Acquisition Strategy
**Focus:** Hijacking existing AI developer mindshare and the immediate engineering required to complete the system.

---

# THE TROJAN HORSE DISTRIBUTION
We will not fight for attention in the crowded "AI Framework" wars. We will be the execution layer they all rely on. Our Go-To-Market is a pure infrastructure play.

### 1. Hijacking the Eliza/Zerebro Networks
Currently, thousands of developers are building autonomous agents using frameworks like ai16z’s Eliza. Their biggest pain point is giving these agents secure, reliable on-chain execution capabilities.

*   **The Wedge:** We release the `@Spacedeck Protocol/eliza-plugin` (located in our worktree at `09_Yesod_Foundation/Agents/eliza-Spacedeck-plugin`). 
*   **The Experience:** A developer adds one line to their config: `plugins: [SpacedeckPlugin]`. Instantly, their agent gains the ability to execute gasless, solver-backed DeFi strikes without managing raw private keys or RPC logic.
*   **The Result:** We leverage the explosive growth of the Eliza ecosystem as our primary distribution channel. Every new agent deployed with our plugin becomes a node routing volume through our Institutional Solver Auction.

### 2. The "Dual-Sided" Onboarding (The Glass Ship)
Our UI (`VesselTerminal`) serves a critical, dual purpose. It is not just a demo; it is the **Admin Console** for the capital deployers.

*   **The Flow:** A fund manager or whale uses the `VesselTerminal`. They connect their wallet (MetaMask/Phantom) and sign the initial EIP-2612 Permit. This generates a scoped "Budget API Key."
*   **The Handoff:** The manager provides this API Key to their autonomous Eliza agent. The agent is now armed with capital, but physically constrained by the guardrails we set (no raw key access, solver-only execution, pre-flight compliance).

### 3. IMMEDIATE WORKTREE IMPERATIVES (The Final Code Manifest)
To bridge the gap between our current backend mechanics and this GTM strategy, the following engineering nodes must be locked immediately:

#### 🔴 PRIORITY 1: The AI Harness (`09_Yesod_Foundation`)
*   **Target:** `eliza-Spacedeck-plugin/src/actions/deployYield.ts`
*   **Action:** Formalize the TypeScript SDK. It must accept a natural language intent (or structured JSON) from the Eliza agent and POST it to our backend.

#### 🟡 PRIORITY 2: The Solver Gateway (`06_Tiferet_Harmony`)
*   **Target:** `auction_engine.py` / `kinetic_service.py`
*   **Action:** Expose the REST/WebSocket endpoints that the `eliza-Spacedeck-plugin` will consume. 

#### 🟢 PRIORITY 3: The Admin Console (`10_Malkuth_Kingdom`)
*   **Target:** `the_glass_ship/components/ActionGateModal.tsx`
*   **Action:** Finalize the EIP-712/EIP-2612 signing flow. 

### 💎 PITCH DECK GEMS
*   "We don't compete with AI frameworks; we complete them. One line of code upgrades any Eliza agent to institutional-grade execution."
*   "The Spacedeck Admin Console: Where human oversight authorizes autonomous scale."
*   "Distribution via integration. We capture the flow of a thousand agents by solving their hardest engineering problem for free."
