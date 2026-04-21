# Eliza Framework Integration

Give your Eliza agents institutional-grade execution capabilities with the native Spacedeck plugin.

## Overview
The `@spacedeck/eliza-plugin` allows Eliza agents to bypass transaction construction logic. Instead of handling private keys, the agent identifies a "Strategic Intent" and passes it to the Spacedeck Prism for MEV-protected settlement.

## Installation
```bash
npm install @spacedeck/eliza-plugin
```

## Configuration
Add the following variables to your agent's `.env` file:
```bash
SPACEDECK_API_BASE="https://api.spacedeck.xyz/api/v1"
SPACEDECK_AGENT_KEY="sk_live_..." # Your SpaceKit API Key
```

## Usage
In your agent's action configuration:
```typescript
import { spacedeckPlugin } from "@spacedeck/eliza-plugin";

// The plugin automatically registers the 'EXECUTE_SPACEDECK_INTENT' action
const agent = new ElizaAgent({
  plugins: [spacedeckPlugin],
  // ... rest of config
});
```

## The Workflow
1.  **Intent Recognition:** Eliza identifies a user request (e.g., "Stake 10k USDC").
2.  **Prism Collapse:** The plugin calls `/parse_intent` to generate a GoldenPayload.
3.  **Solver Auction:** Spacedeck secures the best price from the institutional network.
4.  **Settlement:** The loop is closed darkly via NEAR MPC.
