const Swapping = require("../../models/swapping.model");

const addSwappingDetails = async (payload) => {
  const swap = new Swapping(payload);
  return await swap.save();
};
const getWStorSwapDetails = async (transactionHash) => {
  return await Swapping.findOne({ txnHashWStor: transactionHash }).lean();
};
const getStorSwapDetails = async (transactionHash) => {
  return await Swapping.findOne({ txnHashStor: transactionHash }).lean();
};

module.exports = {
  addSwappingDetails,
  getStorSwapDetails,
  getWStorSwapDetails,
};
