const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  serviceProviderID: {
    type: String,
    unique: true,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
}, { collection: 'Services' });

module.exports = mongoose.model("Service", schema);
