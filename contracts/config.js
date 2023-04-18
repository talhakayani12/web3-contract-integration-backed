const ethContractAbi = require("./ABIs/ethereum-contract-abi.json");
const storageChainContractAbi = require("./ABIs/storagechain-contract-abi.json");

const CONTRACT_DETAILS = {
  80001: {
    abi: ethContractAbi,
    address: "0x616B297704922fCC9DFB399118F7F3E7f8513527",
  },
  8726: {
    abi: storageChainContractAbi,
    address: "0xDc524101D7D3904cb37204b2b5470BFA4Cb11AF9",
  },
};

const RPC_URLS = {
  storagechain: "http://128.199.5.56:9933",
  eth_goerli: "https://goerli.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
  polygon_mombai:
    "https://polygon-mumbai.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
  eth: "https://mainnet.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
};

module.exports = { CONTRACT_DETAILS, RPC_URLS };
