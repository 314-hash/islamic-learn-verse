// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VLCP_WebinarNFT is ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;

    constructor(address initialOwner) 
        ERC721("VLCP Webinar Ticket", "VLCPWT") 
        Ownable(initialOwner) 
    {}

    function mintTicket(address to, string memory metadataURI) external onlyOwner returns (uint256) {
        tokenIdCounter++;
        _mint(to, tokenIdCounter);
        _setTokenURI(tokenIdCounter, metadataURI);
        return tokenIdCounter;
    }
}
