require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      forking: {
        // url: `https://rpc.waterfall.network/rpc`,
        url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
        // url: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
        // url: "https://bsc-dataseed.binance.org/",
      },
    },
  },
};
