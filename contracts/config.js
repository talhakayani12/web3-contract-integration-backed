const ethContractAbi = require('./ABIs/ethereum-contract-abi.json');
const storageChainContractAbi = require('./ABIs/storagechain-contract-abi.json');

const CONTRACT_DETAILS = {
  80001: {
    abi: ethContractAbi,
    address: '0xFacaF75a2D6bC89ab712ba471d353dB3389088aC',
  },
  8726: {
    abi: storageChainContractAbi,
    address: '0x2A7b9b12e2fAeb99FfFF0765F2f484A8D3dFbEe7',
  },
};

const RPC_URLS = {
  storagechain: 'https://storchain-mainnet.invo.zone/',
  eth_goerli: 'https://goerli.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
  polygon_mombai:
    'https://polygon-mumbai.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
  eth: 'https://mainnet.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
};

module.exports = { CONTRACT_DETAILS, RPC_URLS };
