const { getWeb3, getContract } = require("../../web3");

const totalSupply = async (chain_network) => {
  const web3 = getWeb3(chain_network);
  const contract = await getContract(web3);
  const totalSupplyContractResponse = await contract.methods
    .totalSupply()
    .call();

  return totalSupplyContractResponse;
};

const balanceOf = async (chain_network, walletAddress) => {
  const web3 = getWeb3(chain_network);

  const contract = await getContract(web3);
  const balanceOfContractResponse = await contract.methods
    .balanceOf(walletAddress)
    .call();
  return balanceOfContractResponse;
};

// TODO: Contract Function integration here

module.exports = { totalSupply, balanceOf };
