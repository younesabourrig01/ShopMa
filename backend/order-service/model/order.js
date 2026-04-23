const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    items: [
      {
        productId: String,
        quantity: Number,
        price: Number,
      },
    ],
    status: "PENDING" | "CONFIRMED" | "CANCELLED",
    totalPrice: Number,
  },
  { timeseries: true },
);

module.exports = mongoose.model("Order", orderSchema);
