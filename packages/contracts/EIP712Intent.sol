// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title EIP712Intent
 * @dev Spacedeck [Intent -> Capital -> Transaction] pipeline.
 * This is the Step 1 Authorization stub. 
 * EIP-712 Intent Auth protects agent-level strategies. It does NOT authorize
 * budget movement on its own.
 */
interface IEIP712Intent {
    struct IntentPayload {
        bytes32 intentId;
        address targetAsset;
        uint256 amount;
        bytes data;
    }

    function verifyIntentSignature(IntentPayload memory payload, bytes memory signature) external view returns (bool);
}
