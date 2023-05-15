const express = require("express");
const Note = require("../models/Notes");
const Router = express.Router();
const bodyParsers = require("body-parser");
const jsonParser = bodyParsers.json();
const Contact = require("../models/Contact");

const { body, validationResult } = require("express-validator");
const {
  res_success,
  res_error,
  res_not_found,
  res_not_authorized,
} = require("../middleware/response");

Router.post(
  "/create",
  jsonParser,
  [
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    console.log(JSON.stringify(req.body));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;
    const user = req.user.id;
    try {
      Note.create({
        title,
        description,
        user,
      });
      const response = {
        status: 200,
        message: "Note created successfully",
      };
      res.send(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error", err.message);
    }
  }
);

Router.get("/getall", async (req, res) => {
  try {
    if (!req.user) return res_not_authorized(res, "Not authorized");
    if (req.user.isAdmin) {
      let notes = await Note.find().populate("user", "name email");
      res_success(res, notes);
      return;
    } else {
      let notes = await Note.find({ user: req.user.id }).populate(
        "user",
        "name email"
      );
      res_success(res, notes);
    }
  } catch (err) {
    res_error(res, err);
  }
});

Router.put("/update/:id", jsonParser, async (req, res) => {
  const { title, description } = req.body;
  const noteFields = {};
  if (title) noteFields.title = title;
  if (description) noteFields.description = description;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res_not_found(res, "Note not found");
    if (req.user.isAdmin || req.user.id == note.user._id) {
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { $set: noteFields },
        { new: true }
      );
      res_success(res, "Note updated successfully");
      return;
    }
    res_not_authorized(res, "Not authorized");
  } catch (err) {
    res_error(res, err);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res_not_found(res, "Note not found");
    if (req.user.isAdmin || req.user.id == note.user._id) {
      await Note.findByIdAndRemove(req.params.id);
      res_success(res, "Note removed successfully");
      return;
    }
    res_not_authorized(res, "Not authorized");
  } catch (err) {
    res_error(res, err);
  }
});

Router.get("/get/:id", async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res_not_found(res, "Note not found");
    if (req.user.isAdmin || req.user.id == note.user._id) {
      res_success(res, note);
      return;
    }
    res_not_authorized(res, "Not authorized");
  } catch (err) {
    res_error(res, err);
  }
});

Router.get("/getContacts", async (req, res) => {
  try {
    if (req.user.isAdmin) {
      let contacts = await Contact.find();
      res_success(res, contacts);
    } else {
      res_not_authorized(res, "Not authorized");
    }
  } catch (err) {
    res_error(res, err);
  }
});

Router.delete("/deleteContact/:id", async (req, res) => {
  try {
    if (req.user.isAdmin) {
      let contact = await Contact.findById(req.params.id);
      if (!contact) return res_not_found(res, "Contact not found");
      await Contact.findByIdAndRemove(req.params.id);
      res_success(res, "Contact removed successfully");
    } else {
      res_not_authorized(res, "Not authorized");
    }
  } catch (err) {
    res_error(res, err);
  }
});

module.exports = Router;
