require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.28" }  // ✅ added to support Lock.sol
    ]
  },
  networks: {
    sidra: {
      url: "https://node.sidrachain.com",
      chainId: 97453,
      accounts: ["761ed1a2ea554a029d942c5e00a236d7820be7f4a8acec4751b8216224dc52f3"]
    }
  }
};
