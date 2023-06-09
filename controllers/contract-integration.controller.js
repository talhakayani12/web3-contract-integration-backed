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

const database = require("../services/database");

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
    return res
      .status(200)
      .send({ success: true, totalSupply: totalSupplyResponse });
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

    const balanceOfResponse = await balanceOf(network_name, walletAddress);

    return res
      .status(200)
      .send({ success: true, balanceOf: balanceOfResponse });
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

    if (!transactionHash) {
      throw new Error("Please provide the transaction hash.");
    }
    const checkTransactionStatus = await database.swapping.getWStorSwapDetails(
      transactionHash
    );

    if (checkTransactionStatus?.status) {
      return response.status(400).send({
        success: false,
        message: "This transaction is already processed",
      });
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

    if (!transferStorToUserResponse?.status) {
      const payload = {
        walletAddress: transactionReceipt?.from,
        txnHashWStor: transactionHash,
        status: transferStorToUserResponse?.status,
        conversionType: "WSTOR to STOR",
      };

      await database?.swapping?.addSwappingDetails(payload);
      return response.status(400).send({
        success: false,
        message: "Something went wrong while transfering STOR tokens to user",
      });
    }

    if (transferStorToUserResponse) {
      const payload = {
        walletAddress: transactionReceipt?.from,
        txnHashWStor: transactionHash,
        txnHashStor: transferStorToUserResponse?.transactionHash,
        txnAmount: buredValue,
        status: transferStorToUserResponse?.status,
        conversionType: "WSTOR to STOR",
      };

      const swappingDBResponse = await database?.swapping?.addSwappingDetails(
        payload
      );

      if (!swappingDBResponse) {
        return response.status(HTTP_STATUS_CODE.CONFLICT).send({
          success: false,
          message: "Unable to save swapping record into database",
        });
      }

      return response.status(200).send({
        success: true,
        message: "STOR Transfered to user",
        data: {
          transactionReceipt,
          buredValue,
          transferStorToUserResponse,
        },
      });
    }
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

    if (!transactionHash) {
      throw new Error("Please provide the transaction hash.");
    }
    const checkTransactionStatus = await database.swapping.getStorSwapDetails(
      transactionHash
    );

    if (checkTransactionStatus?.status) {
      return response.status(400).send({
        success: false,
        message: "This transaction is already processed",
      });
    }
    const web3 = getWeb3(send_network);

    const transactionReceipt = await web3.eth.getTransaction(transactionHash);

    const mintWeb3 = getWeb3(recive_network);

    const mintStorTokenResponse = await mintWrapStor(
      mintWeb3,
      transactionReceipt?.from,
      transactionReceipt?.value
    );

    if (!mintStorTokenResponse?.status) {
      const payload = {
        walletAddress: transactionReceipt?.from,
        txnHashStor: transactionHash,
        status: mintStorTokenResponse?.status,
        conversionType: "STOR to WSTOR",
      };

      await database?.swapping?.addSwappingDetails(payload);

      return response.status(400).send({
        success: false,
        message:
          "Something went wrong while minting WSTOR token. Please contact customer support.",
      });
    }

    const payload = {
      walletAddress: transactionReceipt?.from,
      txnHashStor: transactionHash,
      txnHashWStor: mintStorTokenResponse?.transactionHash,
      txnAmount: transactionReceipt?.value,
      status: mintStorTokenResponse?.status,
      conversionType: "STOR to WSTOR",
    };

    const swappingDBResponse = await database?.swapping?.addSwappingDetails(
      payload
    );

    if (!swappingDBResponse) {
      return response.status(HTTP_STATUS_CODE.CONFLICT).send({
        success: false,
        message: "Unable to save swapping record into database",
      });
    }

    return response.status(200).send({
      success: true,
      message: "WSTOR tokens minted to user's wallet",
      data: {
        transactionReceipt,
        transferedValue: transactionReceipt?.value,
        mintStorTokenResponse,
      },
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

    if (depositAmountResponse?.status) {
      return response.status(400).send({
        success: false,
        message: "Unable to deposit STOR tokens to contract.",
      });
    }

    return response.status(200).send({
      success: true,
      message: "STOR tokens deposited successfully.",
      data: {
        depositAmountResponse,
      },
    });
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
