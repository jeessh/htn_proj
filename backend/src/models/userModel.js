const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["employer", "worker"],
    required: true,
  },
  salt: {
    type: String,
    required: true,
  }
}, { collection: 'Users' });

// Password hashing
schema.pre("save", function(next){
  let user = this;
  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, user.salt, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", schema);
