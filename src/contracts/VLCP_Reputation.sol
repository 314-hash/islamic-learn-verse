// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VLCP_Reputation {
    mapping(address => uint256) public points;

    event ReputationAwarded(address indexed user, uint256 newTotal);

    function award(address user, uint256 amount) external {
        points[user] += amount;
        emit ReputationAwarded(user, points[user]);
    }

    function getReputation(address user) external view returns (uint256) {
        return points[user];
    }
}
