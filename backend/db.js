const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL || "mongodb+srv://viveksinghhestabit:viveksinghhestabit@cluster0.w3ceaov.mongodb.net/notes?retryWrites=true&w=majority&authSource=admin";
const pool = [];
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (pool.length === 0) {
  mongoose.connect((mongoUrl), connectionOptions);
}

const db = mongoose.connection;


module.exports = db;