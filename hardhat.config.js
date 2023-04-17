require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { ALCHEMY_API_URL, SEPOLIA_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}