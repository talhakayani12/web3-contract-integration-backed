const { getContract } = require("../../web3");

const transferStorToUser = async (
  web3,
  userWalletAddress,
  weiAmountToTransferToUser
) => {
  try {
    const contract = await getContract(web3);

    const accounts = await web3.eth.getAccounts();
    console.log(
      "file: storageChainContractFunction.js:12 ~ accounts:",
      accounts,
      process.env.ADMIN_WALLET_ADDRESS
    );

    const estimatedGasFee = await contract.methods
      .transferStorToUser(userWalletAddress)
      .estimateGas({
        value: weiAmountToTransferToUser,
        from: process.env.ADMIN_WALLET_ADDRESS,
      });

    const transferStorToUserResponse = await contract.methods
      .transferStorToUser(userWalletAddress)
      .send({
        from: process.env.ADMIN_WALLET_ADDRESS,
        value: weiAmountToTransferToUser,
        gas: estimatedGasFee,
      });

    return transferStorToUserResponse;
  } catch (err) {
    console.error(
      "file: storageChainContractFunction.js:5 ~ transferStorToUser ~ err:",
      err
    );
  }
};

const mintWrapStor = async (web3, mintAddress, mintAmount) => {
  try {
    const contract = await getContract(web3);
    console.log(
      "file: storageChainContractFunction.js:45 ~ mintWrapStor ~ contract:",
      contract.methods
    );

    const estimatedGasFee = await contract.methods
      .mint(mintAddress, mintAmount)
      .estimateGas({
        // value: weiAmountToTransferToUser,
        from: process.env.ADMIN_WALLET_ADDRESS,
      });

    const mintWrapStorTokensResponse = await contract.methods
      .mint(mintAddress, mintAmount)
      .send({
        from: process.env.ADMIN_WALLET_ADDRESS,
        // value: weiAmountToTransferToUser,
        gas: estimatedGasFee,
      });
    return mintWrapStorTokensResponse;
  } catch (err) {
    console.error(
      "file: storageChainContractFunction.js:46 ~ mint ~ err:",
      err
    );
  }
};
// depositStor
const depositStorByAdmin = async (web3, depositAmount) => {
  try {
    const contract = await getContract(web3);
    console.log(
      "file: storageChainContractFunction.js:45 ~ mintWrapStor ~ contract:",
      contract.methods
    );

    const weiAmountToDeposit = web3.utils.toWei(depositAmount);

    const estimatedGasFee = await contract.methods.depositStor().estimateGas({
      value: weiAmountToDeposit,
      from: process.env.ADMIN_WALLET_ADDRESS,
    });

    const mintWrapStorTokensResponse = await contract.methods
      .depositStor()
      .send({
        from: process.env.ADMIN_WALLET_ADDRESS,
        value: weiAmountToDeposit,
        gas: estimatedGasFee,
      });
    return mintWrapStorTokensResponse;
  } catch (err) {
    console.error(
      "file: storageChainContractFunction.js:46 ~ mint ~ err:",
      err
    );
  }
};

module.exports = { transferStorToUser, mintWrapStor, depositStorByAdmin };
