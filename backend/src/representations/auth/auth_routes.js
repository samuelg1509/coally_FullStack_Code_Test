const express = require('express');
const router = express.Router();
const authController = require('./auth_controller');
const authValidator = require("./auth_validator");
const validationErrorHandler = require("../../Middleware/validationErrorHandler");

router.post('/register', authValidator.register, validationErrorHandler, authController.register);
router.get('/login', authController.login);


module.exports = router;