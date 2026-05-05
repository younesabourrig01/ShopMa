const express = require("express");
const router = express.Router();

const { sendResults } = require("../controller/sendResultsController");

router.get("/", sendResults);

module.exports = router;
