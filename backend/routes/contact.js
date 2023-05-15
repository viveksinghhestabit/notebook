const express = require("express");
const Router = express.Router();
const bodyParsers = require("body-parser");
const jsonParser = bodyParsers.json();
const Contact = require("../models/Contact");
const { body, validationResult } = require("express-validator");
const { res_success, res_error } = require("../middleware/response");

const router = express.Router();

Router.post("/save-contact", jsonParser, async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    Contact.create({
      name,
      email,
      phone,
      message,
    });
    res_success(res, "Message sent successfully");
  } catch (err) {
    console.error(err.message);
    res_error(res, "Server error", err.message);
  }
});


module.exports = Router;
