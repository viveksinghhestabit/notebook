const mongoose = require("mongoose");

const productCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // creator: { type: String, required: true }
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
ProductCategory.createIndexes();

module.exports = ProductCategory;
