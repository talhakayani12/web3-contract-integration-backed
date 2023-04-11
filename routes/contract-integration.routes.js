const router = require("express").Router();
const controller = require("../controllers/contract-integration.controller");

router.get("/", controller.welcome);

router.get("/totalSupply/:network_name", controller.getTotalSupply);
router.get("/balanceOf/:network_name/:walletAddress", controller.getBalanceOf);

module.exports = router;
