const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  res_success,
  res_error,
  res_not_found,
  res_not_authorized,
} = require("../middleware/response");
const User = require("../models/User");

const Router = express.Router();
const bodyParsers = require("body-parser");
const jsonParser = bodyParsers.json();
const bcrypt = require("bcryptjs");

Router.get("/getall", async (req, res) => {
  try {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (req.user.isAdmin) {
      let users = await User.find({ isAdmin: false });
      res_success(res, users);
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
    let user = await User.findById(req.params.id);
    if (user) {
      res_success(res, user);
    } else {
      res_not_found(res, "User not found");
    }
  } else {
    res_not_authorized(res, "Not authorized");
  }
});

Router.post(
  "/create",
  jsonParser,
  [
    body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
    body("email", "Email is not valid").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res_error(res, errors.array());
      }
      try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        User.create({
          name,
          email,
          password: hashPassword,
        });
        res_success(res, "User created successfully");
      } catch (err) {
        res_error(res, err);
      }
    } else {
      res_not_authorized(res, "Not authorized");
    }
  }
);

Router.put(
  "/update/:id",
  [
    body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
    body("email", "Email is not valid").isEmail(),
  ],
  async (req, res) => {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res_error(res, errors.array());
      }
      try {
        //update user
        const { name, email, isAdmin } = req.body;
        await User.findOneAndUpdate(
          { _id: req.params.id },
          { name, email, isAdmin },
          { new: false }
        );
        res_success(res, "User updated successfully");
      } catch (err) {
        res_error(res, err);
      }
    } else {
      res_not_authorized(res, "Not authorized");
    }
  }
);

Router.delete("/delete/:id", async (req, res) => {
  if (!req.user) return res_not_authorized(res, "Not authorized");
  if (req.user.isAdmin) {
    let user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res_success(res, "User deleted successfully");
    } else {
      res_not_found(res, "User not found");
    }
  } else {
    res_not_authorized(res, "Not authorized");
  }
});

module.exports = Router;
