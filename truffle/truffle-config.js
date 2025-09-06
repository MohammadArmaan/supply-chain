require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const SEPOLIA_URL = process.env.SEPOLIA_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 5777,
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          PRIVATE_KEY,
          SEPOLIA_URL
        ),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.18",
    },
  },
};
