const express = require("express");

const Router = express.Router();
const multer = require("multer");
const { body, validationResult } = require("express-validator");

const Product = require("../models/products");
//file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
//file upload

const {
  res_success,
  res_error,
  res_not_authorized,
} = require("../middleware/response");

Router.post(
  "/create",
  upload.single("image"),
  [
    body("name", "Name is required").not().isEmpty(),
    body("price", "Price is required").not().isEmpty(),
    body("category", "Category is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res_error(res, errors.array());
    }
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (!req.user.isAdmin) return res_not_authorized(res, "Not authorized");
    const { name, price, category, description, status = true } = req.body;
    const user = req.user.id;
    const imagePath = req.file.path.replace("public/", "");
    try {
      Product.create({
        name,
        category,
        price,
        description,
        imagePath,
        status,
        creator: user,
      });
      res_success(res, "Product created successfully");
    } catch (err) {
      console.error(err.message);
      res_error(res, err.message);
    }
  }
);

Router.get("/getall", async (req, res) => {
  try {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (req.user.isAdmin) {
      const product = await Product.find()
        .populate("category", "name")
        .populate("creator", "name");
      product.map((item) => {
        item.imagePath = process.env.BASE_URL + "/" + item.imagePath;
      });
      res_success(res, product);
    } else {
      res_error(res, "Not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res_error(res, err.message);
  }
});

Router.get("/get/:id", async (req, res) => {
  try {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (req.user.isAdmin) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res_error(res, "Product not found");
      }
      product.imagePath = process.env.BASE_URL + "/" + product.imagePath;
      res_success(res, product);
    } else {
      res_error(res, "Not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res_error(res, err.message);
  }
});

Router.put(
  "/update/:id",
  upload.single("image"),
  [
    body("name", "Name is required").not().isEmpty(),
    body("price", "Price is required").not().isEmpty(),
    body("category", "Category is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res_error(res, errors.array());
    }
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (!req.user.isAdmin) return res_not_authorized(res, "Not authorized");
    const { name, category, description, price, status = true } = req.body;
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res_error(res, "Product not found");
      }
      product.name = name;
      product.category = category;
      product.description = description;
      product.price = price;
      product.status = status;
      if (req.file) {
        const imagePath = req.file.path.replace("public/", "");
        product.imagePath = imagePath;
      }
      await product.save();
      res_success(res, "Product updated successfully");
    } catch (err) {
      console.error(err.message);
      res_error(res, err.message);
    }
  }
);

Router.delete("/delete/:id", async (req, res) => {
  try {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (!req.user.isAdmin) return res_not_authorized(res, "Not authorized");
    const product = await Product.findById(req.params.id);
    if (!product) {
      res_error(res, "Product not found");
    }
    await Product.findByIdAndDelete(req.params.id);
    res_success(res, "Product deleted successfully");
  } catch (err) {
    console.log(err.message);
    res_error(res, err.message);
  }
});

module.exports = Router;
