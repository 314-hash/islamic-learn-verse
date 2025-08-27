import { ethers } from "hardhat";

async function main() {
  const eduTokenAddress = "0xE7C1F17Cc6aC5CEB7f763DcE84310D2c26bDF927"; // your deployed EduToken

  // Load contract ABI & instance
  const EduToken = await ethers.getContractAt("EduToken", eduTokenAddress);

  // Mint 1000 EDU tokens to your wallet
  const tx = await EduToken.mint(
    "0xYourWalletAddressHere",
    ethers.parseUnits("1000", 18) // 1000 tokens, 18 decimals
  );

  await tx.wait();
  console.log("✅ Minted 1000 EDU to your wallet");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
