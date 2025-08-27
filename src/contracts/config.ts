// Smart Contract Configuration
export const CONTRACTS = {
  // Replace with actual deployed contract addresses
  COURSE_MANAGER: "0x186509B8C84e4012E69837BBB85F3d9952E53E93",
  EDU_TOKEN: "0xF30D071bADA273BBC6F28c933E5Ac4BFFF31f684",
  EDU_CERTIFICATE: "0xFe5826BD7bac88d4446f8346032f36Dfbc89de84",
  REWARD_DISTRIBUTOR: "0x7b6c9083a0b06E31789c2E375dE55dD900FDe1B6",
  EDU_DAO: "0xf3e077bEfd670A07B2d9ffe23DFAf217d293a4B7",
  REPUTATION: "0x1234567890123456789012345678901234567890", // Add placeholder for Reputation contract
  WEBINAR_NFT: "0x2345678901234567890123456789012345678901", // Add placeholder for WebinarNFT contract
  SCHOLAR_DAO: "0x3456789012345678901234567890123456789012", // Add placeholder for ScholarDAO contract
  ZAKAT_POOL: "0x4567890123456789012345678901234567890123", // Add placeholder for ZakatPool contract
} as const;

// Contract ABIs (simplified for key functions)
export const ABIS = {
  REPUTATION: [
    "function award(address user, uint256 amount) external",
    "function getReputation(address user) external view returns (uint256)",
    "event ReputationAwarded(address indexed user, uint256 newTotal)"
  ],
  
  WEBINAR_NFT: [
    "function mintTicket(address to, string memory metadataURI) external returns (uint256)",
    "function tokenURI(uint256 tokenId) external view returns (string)",
    "function ownerOf(uint256 tokenId) external view returns (address)",
    "function balanceOf(address owner) external view returns (uint256)"
  ],
  
  SCHOLAR_DAO: [
    "function verifyScholar(address scholar, string memory metadata) external",
    "function revokeScholar(address scholar) external", 
    "function isScholarVerified(address scholar) external view returns (bool)",
    "event ScholarVerified(address scholar, string metadata)",
    "event ScholarRevoked(address scholar)"
  ],
  
  ZAKAT_POOL: [
    "function donate(uint256 amount) external",
    "function withdraw(address to, uint256 amount) external",
    "function donations(address donor) external view returns (uint256)",
    "function totalTokenDonations() external view returns (uint256)",
    "event Donated(address indexed donor, uint256 amount)"
  ],
  
  COURSE_MANAGER: [
    "function createCourse(string memory title, string memory ipfsHash, uint256 price) external",
    "function enroll(uint256 courseId) external",
    "function courses(uint256 id) external view returns (tuple(uint256 id, address instructor, string title, string ipfsHash, uint256 price, bool isActive))",
    "function enrolledCourses(address student, uint256 index) external view returns (uint256)",
    "event CourseCreated(uint256 id, address indexed instructor)",
    "event Enrolled(address indexed student, uint256 indexed courseId)"
  ],
  
  ERC20: [
    "function balanceOf(address owner) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)"
  ]
} as const;

export const NETWORK_CONFIG = {
  31415926: { // Sidra Chain
    name: "Sidra Chain",
    rpcUrl: "https://rpc.testnet.sidra.org", // Update with actual RPC
    blockExplorer: "https://explorer.sidra.org",
    nativeCurrency: {
      name: "Sidra",
      symbol: "SDR",
      decimals: 18
    }
  }
} as const;
