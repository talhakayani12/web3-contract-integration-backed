const router = require("express").Router();

router.use("/contract-function", require("./contract-integration.routes.js"));

module.exports = router;
