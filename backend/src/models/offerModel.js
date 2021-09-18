const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  offerID:{
    type: String,
    unique: true,
    required: true,
  },
  employerID:{
    type: String,
    required: true,
  },
  workerID:{
      type: String,
      required: true,
  },
  address:{
    type: String,
    required: true,
  },
  jobType:{
      type: String,
      required: true
  },
  distance:{
      type: String,
      required: true,
  }

}, { collection: 'Offers' });

module.exports = mongoose.model("Offer", schema);
