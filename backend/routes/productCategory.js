const express = require("express");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const ProductCategory = require("../models/productCategory");

//file upload
const multer = require("multer");
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
  res_not_found,
} = require("../middleware/response");

Router.post(
  "/create",
  upload.single("image"),
  [
    body("name", "Name is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res_error(res, errors.array());
    }
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (!req.user.isAdmin) return res_not_authorized(res, "Not authorized");
    const { name, description } = req.body;
    const user = req.user.id;
    const imagePath = req.file.path.replace("public/", "");
    try {
      ProductCategory.create({
        name,
        description,
        imagePath,
        creator: user,
      });
      res_success(res, "Product category created successfully");
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
      let productCategories = await ProductCategory.find().populate(
        "creator",
        "name email"
      );
      productCategories.map((item) => {
        item.imagePath = process.env.BASE_URL + "/" + item.imagePath;
      });
      res_success(res, productCategories);
      return;
    } else {
      res_not_authorized(res, "Not authorized");
    }
  } catch (err) {
    res_error(res, err);
  }
});

Router.get("/get/:id", async (req, res) => {
  if (!req.user) return res_not_authorized(res, "Not authorized");
  if (req.user.isAdmin) {
    let productCategory = await ProductCategory.findById(req.params.id);
    if (productCategory) {
      productCategory.imagePath =
        process.env.BASE_URL + "/" + productCategory.imagePath;
      res_success(res, productCategory);
    } else {
      res_not_found(res, "Product category not found");
    }
  } else {
    res_not_authorized(res, "Not authorized");
  }
});

Router.put(
  "/update/:id",
  upload.single("image"),
  [
    body("name", "Name is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res_error(res, errors.array());
    }
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (!req.user.isAdmin) return res_not_authorized(res, "Not authorized");
    const { name, description } = req.body;
    const user = req.user.id;
    if (req.file) {
      let imagePath = req.file.path.replace("public/", "");
      var data = {
        name,
        description,
        imagePath,
        creator: user,
      };
    } else {
      data = {
        name,
        description,
        creator: user,
      };
    }

    try {
      await ProductCategory.findByIdAndUpdate(req.params.id, data);
      res_success(res, "Product category updated successfully");
    } catch (err) {
      console.error(err.message);
      res_error(res, err.message);
    }
  }
);

Router.delete("/delete/:id", async (req, res) => {
  if (!req.user) return res_not_authorized(res, "Not authorized");
  if (req.user.isAdmin) {
    try {
      let productCategory = await ProductCategory.findById(req.params.id);
      if (productCategory) {
        await ProductCategory.findByIdAndDelete(req.params.id);
        res_success(res, "Product category deleted successfully");
      } else {
        res_not_found(res, "Product category not found");
      }
    } catch (err) {
      res_error(res, err);
    }
  } else {
    res_not_authorized(res, "Not authorized");
  }
});

module.exports = Router;
