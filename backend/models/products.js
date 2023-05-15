const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // creator: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);
Product.createIndexes();

module.exports = Product;
