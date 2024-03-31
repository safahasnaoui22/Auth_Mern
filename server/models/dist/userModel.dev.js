"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    "default": 'user'
  },
  password: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=userModel.dev.js.map
