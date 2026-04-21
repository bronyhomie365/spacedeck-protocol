from pydantic import BaseModel, Field
from typing import List, Optional

class SVMConstraints(BaseModel):
    """[SVM]: Precise execution parameters for the Solana Virtual Machine."""
    max_compute_units: int = Field(default=200000, description="Upper bound for protocol compute consumption.")
    jito_bundle_tip_lamports: Optional[int] = Field(default=None, description="Optional MEV-protection tip for Jito Block Engine.")
    revert_on_failure: bool = True

class GoldenPayload(BaseModel):
    """The irreducible schema for an institutional Spacedeck intent."""
    intent_id: str = Field(..., description="Deterministic transaction manifest identifier.")
    source_asset: str
    target_asset: str
    amount_usd: float
    wallet_id: str
    vector_type: str = "DARK_POOL"
    solver_id: Optional[str] = None
    
class ExecutionRequest(BaseModel):
    """A momentum-ready strike request for SVM execution."""
    payload: GoldenPayload
    signature: str
    deadline: int
    svm_constraints: Optional[SVMConstraints] = None
