"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = require('../models/userModel.js');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken'); // Register


exports.signup = function _callee(req, res, next) {
  var user, error, hashedPassword, newUser, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          error = new Error('User already exists!');
          error.statusCode = 400;
          throw error;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 10:
          hashedPassword = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(User.create(_objectSpread({}, req.body, {
            password: hashedPassword
          })));

        case 13:
          newUser = _context.sent;
          token = jwt.sign({
            _id: newUser._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          });
          res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token: token,
            user: {
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role
            }
          });
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // Login


exports.login = function _callee2(req, res, next) {
  var _req$body, email, password, user, error, isPasswordValid, _error, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          error = new Error('User not found');
          error.statusCode = 404;
          throw error;

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 16;
            break;
          }

          _error = new Error('Incorrect Password or Email');
          _error.statusCode = 401;
          throw _error;

        case 16:
          token = jwt.sign({
            _id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          });
          res.status(200).json({
            status: 'success',
            token: token,
            message: 'Logged in Successfully',
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
};
//# sourceMappingURL=authController.dev.js.map
