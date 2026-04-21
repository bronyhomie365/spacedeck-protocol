# Zerebro Harness Integration

Spacedeck provides a high-performance harness for Zerebro agents, enabling seamless command over omnichain liquidity.

## Installation
```bash
pip install spacedeck-zerebro-harness
```

## Quick Start
Initialize the Spacedeck client within your Zerebro agent logic:

```python
import os
import asyncio
from spacedeck_zerebro import ZerebroHarness

async def execute_zerebro_strike():
    harness = ZerebroHarness(api_key=os.environ.get("SPACEDECK_AGENT_KEY", ""))
    
    # Execute a complex intent via natural language
    receipt = await harness.strike("Optimize my SOL/USDC yield on Kamino")
    print(f"Settled via {receipt.get('solver_id')} | Vector: {receipt.get('vector_type')}")

asyncio.run(execute_zerebro_strike())
```

## Key Benefits
*   **Zero Key Exposure:** Zerebro never handles the primary budget keys.
*   **Atomic Settlement:** 12-second cross-chain finalized state.
*   **MEV Shielding:** All trades are routed through the Spacedeck dark pool.
