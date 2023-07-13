const Swapping = require("../../models/swapping.model");

const addSwappingDetails = async (payload) => {
  const swap = new Swapping(payload);
  return await swap.save();
};

module.exports = { addSwappingDetails };
