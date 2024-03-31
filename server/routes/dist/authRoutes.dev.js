"use strict";

var express = require('express');

var authController = require('../controllers/authController.js');

var router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
module.exports = router;
//# sourceMappingURL=authRoutes.dev.js.map
