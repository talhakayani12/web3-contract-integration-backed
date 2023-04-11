const {
  totalSupply,
  balanceOf,
} = require("../contracts/ContractFunctions/ethContractFunction");

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
module.exports = {
  welcome,
  getTotalSupply,
  getBalanceOf,
};
