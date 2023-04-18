const router = require("express").Router();
const controller = require("../controllers/contract-integration.controller");

router.get("/", controller.welcome);

router.get("/totalSupply/:network_name", controller.getTotalSupply);
router.get("/balanceOf/:network_name/:walletAddress", controller.getBalanceOf);
router.get(
  "/depositInTreasury/:recive_network/:send_network/:transactionHash",
  controller.depositInTreasury
);
router.get(
  "/transferIntoTreasury/:send_network/:recive_network/:transactionHash",
  controller.transferIntoTreasury
);

router.get("/depositAmount/:network_name/:amount", controller.depositAmount);
module.exports = router;
