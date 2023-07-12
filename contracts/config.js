const ethContractAbi = require('./ABIs/ethereum-contract-abi.json');
const storageChainContractAbi = require('./ABIs/storagechain-contract-abi.json');

const CONTRACT_DETAILS = {
  80001: {
    abi: ethContractAbi,
    address: '0xFacaF75a2D6bC89ab712ba471d353dB3389088aC',
  },
  8726: {
    abi: storageChainContractAbi,
    address: '0xF6E87503a9c06219F07e82C27970D1415da4fBeB',
  },
};

const RPC_URLS = {
  storagechain: 'https://testnet-validator.storagechain.io',
  eth_goerli: 'https://goerli.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
  polygon_mombai:
    'https://polygon-mumbai.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
  eth: 'https://mainnet.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
};

module.exports = { CONTRACT_DETAILS, RPC_URLS };
