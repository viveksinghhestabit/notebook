const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", OrderSchema);
Order.createIndexes();

module.exports = Order;
