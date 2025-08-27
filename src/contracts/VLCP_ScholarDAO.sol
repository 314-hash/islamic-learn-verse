// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VLCP_ScholarDAO {
    address public admin;

    mapping(address => bool) public verifiedScholars;
    mapping(address => string) public scholarMetadata;

    event ScholarVerified(address scholar, string metadata);
    event ScholarRevoked(address scholar);

    constructor() {
        admin = msg.sender;
    }

    function verifyScholar(address scholar, string memory metadata) external {
        require(msg.sender == admin, "Only admin");
        verifiedScholars[scholar] = true;
        scholarMetadata[scholar] = metadata;
        emit ScholarVerified(scholar, metadata);
    }

    function revokeScholar(address scholar) external {
        require(msg.sender == admin, "Only admin");
        verifiedScholars[scholar] = false;
        emit ScholarRevoked(scholar);
    }

    function isScholarVerified(address scholar) external view returns (bool) {
        return verifiedScholars[scholar];
    }
}
