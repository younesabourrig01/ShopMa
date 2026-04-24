const express = require("express");
const {
  createOrder,
  getOrderByUser,
  getAllOrders,
} = require("../controller/orerController");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrderByUser);
router.get("/admin/", getAllOrders);

module.exports = router;
