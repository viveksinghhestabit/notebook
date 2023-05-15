const mongoose = require("mongoose");

const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/notes", {
  useNewUrlParser: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;