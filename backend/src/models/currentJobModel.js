const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  jobID:{
    type: String,
    unique: true,
    required: true,
  },
  serviceProviderID: {
    type: String,
    required: true,
  },
  employerID:{
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
  }

}, { collection: 'CurrentJobs' });

module.exports = mongoose.model("CurrentJob", schema);
