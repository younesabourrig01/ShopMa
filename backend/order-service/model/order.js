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
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
    totalPrice: Number,
  },
  { timestamps: true },
);
// "PENDING" | "CONFIRMED" | "CANCELLED"
module.exports = mongoose.model("Order", orderSchema);
