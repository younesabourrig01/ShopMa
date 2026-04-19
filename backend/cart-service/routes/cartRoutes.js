const express = require("express");
const {
  addItem,
  getCart,
  removeItem,
  clearCart,
  updateItemQuantity,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addItem);
router.get("/", getCart);
router.delete("/:id", removeItem);
router.delete("/id", clearCart);
router.post("/:id", updateItemQuantity);

module.exports = router;
