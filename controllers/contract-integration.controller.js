const {
  totalSupply,
  balanceOf,
} = require("../contracts/ContractFunctions/ethContractFunction");
const {
  transferStorToUser,
  mintWrapStor,
  depositStorByAdmin,
} = require("../contracts/ContractFunctions/storageChainContractFunction");
const { getWeb3 } = require("../web3");

const welcome = async (req, res) => {
  return res.status(200).send({
    message: "Welcome to the contract integration api",
    success: true,
  });
};

const getTotalSupply = async (req, res) => {
  try {
    const network_name = req.params.network_name;
    const totalSupplyResponse = await totalSupply(network_name);
    return res.status(200).send({ totalSupply: totalSupplyResponse });
  } catch (err) {
    console.error(
      "file: contract-integration.controller.js:33 ~ getTotalSupply ~ err:",
      err
    );
    return res.status(500).send({ err: err.message });
  }
};
const getBalanceOf = async (req, res) => {
  try {
    const { network_name, walletAddress } = req.params;
    console.error(
      "file: contract-integration.controller.js:29 ~ getBalanceOf ~ walletAddress:",
      walletAddress
    );
    console.error(
      "file: contract-integration.controller.js:29 ~ getBalanceOf ~ network_name:",
      network_name
    );

    const balanceOfResponse = await balanceOf(network_name, walletAddress);

    return res.status(200).send({ balanceOf: balanceOfResponse });
  } catch (err) {
    console.error(
      "file: contract-integration.controller.js:33 ~ getTotalSupply ~ err:",
      err
    );
    return res.status(500).send({ err: err.message });
  }
};

const depositInTreasury = async (request, response) => {
  try {
    const { recive_network, send_network, transactionHash } = request.params;
    console.log(
      "file: contract-integration.controller.js:53 ~ depositInTreasury ~ transactionHash:",
      transactionHash,
      recive_network,
      send_network
    );

    if (!transactionHash) {
      throw new Error("Please provide the transaction hash.");
    }

    const web3 = getWeb3(recive_network);

    const transactionReceipt = await web3.eth.getTransactionReceipt(
      transactionHash
    );
    const buredValue = web3.utils.hexToNumberString(
      transactionReceipt?.logs[0]?.data
    );

    const sendWeb3 = getWeb3(send_network);

    const transferStorToUserResponse = await transferStorToUser(
      sendWeb3,
      transactionReceipt?.from,
      buredValue
    );

    return response.status(200).send({
      transactionReceipt,
      buredValue,
      transferStorToUserResponse,
    });
  } catch (err) {
    console.error(
      "file: contract-integration.controller.js:52 ~ depositInTreasury ~ err:",
      err
    );

    return response.status(500).send({ err: err.message });
  }
};

const transferIntoTreasury = async (request, response) => {
  try {
    const { recive_network, send_network, transactionHash } = request.params;
    console.log(
      "file: contract-integration.controller.js:53 ~ depositInTreasury ~ transactionHash:",
      transactionHash,
      recive_network,
      send_network
    );

    if (!transactionHash) {
      throw new Error("Please provide the transaction hash.");
    }

    const web3 = getWeb3(send_network);

    const transactionReceipt = await web3.eth.getTransaction(transactionHash);
    console.log(
      "file: contract-integration.controller.js:118 ~ transferIntoTreasury ~ transactionReceipt:",
      transactionReceipt
    );

    // const transferedValue = web3.utils.hexToNumberString(
    //   transactionReceipt?.value
    // );

    const mintWeb3 = getWeb3(recive_network);

    const mintStorTokenResponse = await mintWrapStor(
      mintWeb3,
      transactionReceipt?.from,
      transactionReceipt?.value
    );

    return response.status(200).send({
      transactionReceipt,
      transferedValue: transactionReceipt?.value,
      mintStorTokenResponse,
    });
  } catch (err) {
    console.error(
      "file: contract-integration.controller.js:103 ~ transferIntoTreasury ~ err:",
      err
    );
    return response.status(500).send({ err: err.message });
  }
};

const depositAmount = async (request, response) => {
  try {
    const { network_name, amount } = request.params;

    const web3 = getWeb3(network_name);

    const depositAmountResponse = await depositStorByAdmin(web3, amount);

    return response.status(200).send(depositAmountResponse);
  } catch (err) {
    console.error(
      "file: contract-integration.controller.js:153 ~ depositAmount ~ err:",
      err
    );
    return response.status(500).send({ err: err.message });
  }
};
module.exports = {
  welcome,
  getTotalSupply,
  getBalanceOf,
  depositInTreasury,
  transferIntoTreasury,
  depositAmount,
};
