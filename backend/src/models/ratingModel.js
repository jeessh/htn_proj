const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  rootID: { // person who rated
    type: String,
    unique: true,
    required: true,
  },
  targetID: { // person who is being rated
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
