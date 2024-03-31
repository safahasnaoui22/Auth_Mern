"use strict";

require('dotenv').config(); // Load environment variables from .env file


var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var authRouter = require('./routes/authRoutes.js');

var app = express();
app.use(cors());
app.use(express.json());
app.get('/', function (req, res) {
  res.send('Hello, welcome to the Nova API!');
});
app.use('/api/auth', authRouter);
mongoose.connect('mongodb+srv://nova:nova@cluster0.haxquto.mongodb.net/').then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (error) {
  return console.log('Failed to connect to MongoDB:', error);
});
app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Nova Running on port ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
