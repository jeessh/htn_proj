const mongoose = require("mongoose");

// "JOB POSTING" FOR EACH WORKER
// PRICE ADD LATER

let schema = new mongoose.Schema({
  serviceID:{
    type: String,
    unique: true,
    required: true,
  },
  serviceProviderID: { // username contains postal code and phonenumber
    type: String,
    unique: true, // should this be unique if one worker can offer multiple services
  },
  type: { // type of job
    type: String,
    enum: ["Lawn Mowing", "Snow Removal", "Weed Removal", "Lawn Watering", "Leaf Raking"],
    required: true
  },
  maxDistance: {
    type: String,
    required: true
  }
}, { collection: 'Services' });

module.exports = mongoose.model("Service", schema);
