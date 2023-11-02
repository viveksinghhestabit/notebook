const express = require("express");
const User = require("../models/User");
const Product = require("../models/products");
const ProductCategory = require("../models/productCategory");
const Router = express.Router();
const bodyParsers = require("body-parser");
const jsonParser = bodyParsers.json();
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { body, validationResult } = require("express-validator");
const { res_success, res_error, jwtSign } = require("../middleware/response");

Router.post(
  "/register",
  jsonParser,
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(JSON.stringify(req.body));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    let passwordHash = await bcrypt.hash(password, 10);
    try {
      User.create({
        name,
        email,
        password: passwordHash,
      });
      res_success(res, "User created successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error", err.message);
    }
  }
);

Router.post(
  "/login",
  jsonParser,
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res_error(res, "Invalid credentials");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res_error(res, "Invalid credentials");
      }
      const token = jwtSign(user);
      const response = {
        status_code: 200,
        status_message: "OK",
        access_token: token,
        message: "User logged in",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
      res.json({ response });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error", err.message);
    }
  }
);

Router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({}).populate("category", "name");
    products.map((item) => {
      item.imagePath = process.env.BASE_URL + "/" + item.imagePath;
    });
    res_success(res, products);
  } catch (err) {
    console.error(err.message);
    res_error(res, "Server error");
  }
});

Router.get("/allcategories", async (req, res) => {
  try {
    const categories = await ProductCategory.find({});
    categories.map((item) => {
      item.imagePath = process.env.BASE_URL + "/" + item.imagePath;
    });
    res_success(res, categories);
  } catch (err) {
    console.error(err.message);
    res_error(res, "Server error");
  }
});

Router.get("/productbyCatId/:id", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id }).populate(
      "category",
      "name"
    );
    products.map((item) => {
      item.imagePath = process.env.BASE_URL + "/" + item.imagePath;
    });
    res_success(res, products);
  } catch (err) {
    console.error(err.message);
    res_error(res, "Server error");
  }
});

Router.post("/googlelogin", jsonParser, async (req, res) => {
  const { tokenId } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email_verified, name, email } = response.payload;
    if (email_verified) {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwtSign(user);
        const response = {
          status_code: 200,
          status_message: "OK",
          access_token: token,
          message: "User logged in",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
        res.json({ response });
      } else {
        let password = email + process.env.JWT_SECRET;
        let passwordHash = await bcrypt.hash(password, 10);
        let nuser = User.create({
          name,
          email,
          password: passwordHash,
        });
        const token = jwtSign(nuser);
        const response = {
          status_code: 200,
          status_message: "OK",
          access_token: token,
          message: "User logged in",
          user: {
            id: nuser._id,
            name: nuser.name,
            email: nuser.email,
          },
        };
        res.json({ response });
      }
    }
  } catch (err) {
    console.error(err.message);
    res_error(res, "Server error");
  }
});

module.exports = Router;
