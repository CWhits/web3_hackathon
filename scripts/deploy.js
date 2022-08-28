const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  CollatsERC1155 = await ethers.getContractFactory("CollatsERC1155");
  collatsERC1155 = await CollatsERC1155.deploy();
  await collatsERC1155.deployed();

  console.log("collatsERC1155 address " + collatsERC1155.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
