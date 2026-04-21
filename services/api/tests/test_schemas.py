import pytest
from pydantic import ValidationError
import sys
import os
from pathlib import Path

# Add core to path for local execution
sys.path.append(str(Path(__file__).parent.parent))
from main import TetryonicPayload, ExecutionRequest

def test_payload_valid_tetryon():
    """[TETRYONICS]: Validating a perfect geometric intent."""
    data = {
        "intent_id": "STRIKE_001",
        "source_asset": "USDC",
        "target_asset": "SOL",
        "amount_usd": 1000.50,
        "wallet_id": "0x1234567890abcdef1234567890abcdef12345678",
        "vector_type": "DARK_POOL"
    }
    payload = TetryonicPayload(**data)
    assert payload.intent_id == "STRIKE_001"
    assert payload.amount_usd == 1000.50

def test_payload_invalid_amount():
    """[THERMODYNAMICS]: Rejecting non-physical (string) mass."""
    data = {
        "intent_id": "STRIKE_002",
        "source_asset": "USDC",
        "target_asset": "SOL",
        "amount_usd": "TOO_MUCH", # Invalid type
        "wallet_id": "0x123",
        "vector_type": "PURE_YIELD"
    }
    with pytest.raises(ValidationError):
        TetryonicPayload(**data)

def test_execution_request_nesting():
    """[KINEMATICS]: Validating the transition payload nesting."""
    payload_data = {
        "intent_id": "STRIKE_003",
        "source_asset": "USDC",
        "target_asset": "SOL",
        "amount_usd": 500.0,
        "wallet_id": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "vector_type": "DARK_POOL"
    }
    req_data = {
        "payload": payload_data,
        "signature": "0xsignature_blob",
        "deadline": 1713456000
    }
    req = ExecutionRequest(**req_data)
    assert req.payload.amount_usd == 500.0
    assert req.deadline == 1713456000
