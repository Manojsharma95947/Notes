const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const Notes = mongoose.model("Notes", noteSchema);

module.exports = Notes;