// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VLCP_ZakatPool is Ownable {
    IERC20 public eduToken;
    uint256 public totalTokenDonations;

    mapping(address => uint256) public donations;

    event Donated(address indexed donor, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    constructor(address _eduToken, address initialOwner) Ownable(initialOwner) {
        eduToken = IERC20(_eduToken);
    }

    function donate(uint256 amount) external {
        eduToken.transferFrom(msg.sender, address(this), amount);
        donations[msg.sender] += amount;
        totalTokenDonations += amount;
        emit Donated(msg.sender, amount);
    }

    function withdraw(address to, uint256 amount) external onlyOwner {
        require(amount <= totalTokenDonations, "Insufficient balance");
        eduToken.transfer(to, amount);
        totalTokenDonations -= amount;
        emit Withdrawn(to, amount);
    }
}
