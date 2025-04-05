require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.11",  // Keep Solidity version as is or adjust to your contract's version
  defaultNetwork: "volta", // Use Volta test network

  networks: {
    hardhat: {},
    volta: {
      url: API_URL, // Ensure this is the correct Volta RPC URL
      accounts: [`0x${PRIVATE_KEY}`], // Ensure the private key is correct
      gas: 6000000, // Set a more reasonable gas limit (adjust as necessary)
      gasPrice: 20000000000, // Optional, can be commented out for testnets
    },
  },

  // Other optional settings, e.g., for better debugging:
  paths: {
    artifacts: './src/artifacts', // Adjust based on your project structure
  },

  mocha: {
    timeout: 20000, // Timeout for tests (adjust as needed)
  },
};
