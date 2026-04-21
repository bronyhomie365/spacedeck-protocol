// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title EIP2612Budget
 * @dev Spacedeck [Intent -> Capital -> Transaction] pipeline.
 * This is the Step 2 Authorization stub.
 * A human principal signs this gasless permit ONCE to authorize a capital ceiling.
 * It physically decouples budget from the AI agent's execution logic.
 */
interface IEIP2612Budget {
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}
