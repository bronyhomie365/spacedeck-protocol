from pydantic import BaseModel, Field
from typing import List, Optional

class GoldenPayload(BaseModel):
    """[TETRYONICS]: The irreducible geometric structure of Spacedeck intent."""
    intent_id: str = Field(..., description="Unique vibrational frequency ID")
    source_asset: str
    target_asset: str
    amount_usd: float
    wallet_id: str
    vector_type: str = "DARK_POOL"
    solver_id: Optional[str] = None
    
class ExecutionRequest(BaseModel):
    """[KINEMATICS]: A momentum-ready strike request."""
    payload: GoldenPayload
    signature: str
    deadline: int
