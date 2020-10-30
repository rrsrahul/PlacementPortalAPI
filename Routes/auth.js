const express = require('express');

const Router = express.Router();
const authController = require('../Controllers/auth');

//SignUp
Router.post('/signup',authController.signup);

//Login
Router.post('/login',authController.login);


module.exports = Router;