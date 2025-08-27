// Smart Contract Configuration
export const CONTRACTS = {
  // Replace with actual deployed contract addresses
  REPUTATION: "0x9bbfd3769759da15fe55fedca4af322fe1aaf80c",
  WEBINAR_NFT: "0x0000000000000000000000000000000000000000", 
  SCHOLAR_DAO: "0xefb059481b92be5a8b6b118355d9676633a5dfc5",
  ZAKAT_POOL: "0x0000000000000000000000000000000000000000",
  COURSE_MANAGER: "0x5330b26039bfbaf199ac60da500561b3169c667c",
  EDU_TOKEN: "0xE7C1F17Cc6aC5CEB7f763DcE84310D2c26bDF927", // ERC20 token for payments
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
