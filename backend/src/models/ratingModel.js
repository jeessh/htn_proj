const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  rootID: {
    type: String,
    unique: true,
    required: true,
  },
  targetID: {
    type: String,
    required: true,
  },
  ratingNum: {
    type: Number,
    required: true,
  },
  ratingText: {
    type: String,
    required: true,
  }
}, { collection: 'Ratings' });

module.exports = mongoose.model("Rating", schema);
