const ethContractAbi = require("./ABIs/ethereum-contract-abi.json");
const storageChainContractAbi = require("./ABIs/storagechain-contract-abi.json");

const CONTRACT_DETAILS = {
  5: {
    abi: ethContractAbi,
    address: "0x49605026438449Bb9d911d69a9E2cA6dfDdb9f2E",
  },
  8726: {
    abi: storageChainContractAbi,
    address: "0xBe1E5E8d4bA986C855092FA040A08d0c44f1b216",
  },
};

const RPC_URLS = {
  storagechain: "http://128.199.5.56:9933",
  eth_goerli: "https://goerli.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
  eth: "https://mainnet.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460",
};

module.exports = { CONTRACT_DETAILS, RPC_URLS };
