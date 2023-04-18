const Web3 = require("web3");
const { RPC_URLS, CONTRACT_DETAILS } = require("../contracts/config");

const getWeb3 = (network_name) => {
  try {
    console.log(
      "file: index.js:7 ~ getWeb3 ~ RPC_URLS[network_name]:",
      RPC_URLS[network_name]
    );

    const web3 = new Web3(RPC_URLS[network_name]);

    web3.eth.accounts.wallet.add(process.env.ADMIN_WALLET_PRIVATE_KEY);

    return web3;
  } catch (err) {
    console.error("file: index.js:8 ~ getWeb3 ~ err:", err);
  }
};

const initContract = (web3, contractABI, contractAddress) => {
  try {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
  } catch (err) {
    console.error("file: index.js:18 ~ initContract ~ err:", err);
  }
};

const getContract = async (web3) => {
  const networkChainId = await web3.eth.getChainId();
  const contractDetails = CONTRACT_DETAILS[networkChainId];

  const contract = initContract(
    web3,
    contractDetails?.abi,
    contractDetails?.address
  );
  return contract;
};

module.exports = { getWeb3, initContract, getContract };
