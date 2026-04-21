import time
import secrets
from eth_account import Account
from eth_account.messages import encode_typed_data

def generate_eip2612_signature(private_key, owner, spender, value, deadline, chain_id=11155111, verifying_contract="0x1c7D4B196Cb0271b3d4985018F8f6dfE6476b32b"):
    """
    [TETRYONICS]: Physical Cryptographic Signature Generation for SEPOLIA USDC.
    """
    domain = {
        "name": "USD Coin",
        "version": "2",
        "chainId": chain_id,
        "verifyingContract": verifying_contract
    }
    
    types = {
        "EIP712Domain": [
            {"name": "name", "type": "string"},
            {"name": "version", "type": "string"},
            {"name": "chainId", "type": "uint256"},
            {"name": "verifyingContract", "type": "address"}
        ],
        "Permit": [
            {"name": "owner", "type": "address"},
            {"name": "spender", "type": "address"},
            {"name": "value", "type": "uint256"},
            {"name": "nonce", "type": "uint256"},
            {"name": "deadline", "type": "uint256"}
        ]
    }
    
    message = {
        "owner": owner,
        "spender": spender,
        "value": value,
        "nonce": 0,
        "deadline": deadline
    }
    
    full_data = {
        "types": types,
        "domain": domain,
        "primaryType": "Permit",
        "message": message
    }
    
    # Sign the structured data
    signable_msg = encode_typed_data(full_message=full_data)
    signed_msg = Account.sign_message(signable_msg, private_key=private_key)
    
    return signed_msg.signature.hex()

if __name__ == "__main__":
    # MOCK TEST DATA
    # WARNING: This is a placeholder private key. Never use real keys in repo tests.
    TEST_PRIVATE_KEY = "0x" + "a" * 64 
    acct = Account.from_key(TEST_PRIVATE_KEY)
    
    # 2.4 Million USDC Strike
    value = 2400000 * 10**6 
    deadline = int(time.time() + 3600)
    spender = "0x8c249E3817fF9B4D82812231d5533A753Ba43604" # Spacedeck Clearinghouse
    
    sig = generate_eip2612_signature(TEST_PRIVATE_KEY, acct.address, spender, value, deadline)
    
    print("\n--- [SPACEDECK OMEGA SIGNATURE GENERATOR] ---")
    print(f"OWNER:   {acct.address}")
    print(f"SPENDER: {spender}")
    print(f"VALUE:   {value}")
    print(f"SIG:     {sig}")
    print("---------------------------------------------\n")
