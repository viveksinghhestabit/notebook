const mangoose = require("mongoose");

const notesSchema = new mangoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    required: true,
    type: mangoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Notes = mangoose.model("Notes", notesSchema);
Notes.createIndexes();
module.exports = Notes;
