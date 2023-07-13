const ethContractAbi = require("./ABIs/ethereum-contract-abi.json");
const storageChainContractAbi = require("./ABIs/storagechain-contract-abi.json");

const CONTRACT_DETAILS = {
  80001: {
    abi: ethContractAbi,
    address: process.env.ETH_CONTRACT_ADDRESS,
  },
  8726: {
    abi: storageChainContractAbi,
    address: process.env.STORAGECHAIN_CONTRACT_ADDRESS,
  },
};

const RPC_URLS = {
  storagechain: "https://testnet-validator.storagechain.io",
  eth_goerli: "https://goerli.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
  polygon_mombai:
    "https://polygon-mumbai.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
  eth: "https://mainnet.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
};

module.exports = { CONTRACT_DETAILS, RPC_URLS };
