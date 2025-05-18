const express = require('express');
const { sendOTP, verifyOTP, signup, login, phoneNumber } = require('../controller/user.controller')
const userRouter = express.Router();

userRouter.post('/send-otp', sendOTP);
userRouter.post('/verify-otp', verifyOTP);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/login-email', login);
userRouter.get('/:phoneNumber', phoneNumber);

module.exports = userRouter;