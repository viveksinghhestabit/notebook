const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/notes";
const pool = [];
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (pool.length === 0) {
  mongoose.connect(mongoUrl, connectionOptions);
}

const db = mongoose.connection;


module.exports = db;