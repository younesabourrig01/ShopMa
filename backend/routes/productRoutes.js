const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/update/:id", updateProduct);
router.get("/delet/:id", deleteProduct);

module.exports = router;
