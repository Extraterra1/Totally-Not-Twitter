const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

exports.registerPOST = [
  body('email')
    .trim()
    .isEmail()
    .custom(async (val) => {
      const emailExists = await User.findOne({ email: val });
      if (emailExists) throw new Error('Email is already in use');
    }),
  body('username')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Username must be between 2 and 15 characters long')
    .custom(async (val) => {
      const usernameExists = await User.findOne({ username: val });
      if (usernameExists) throw new Error('Username already exists');
    }),
  body('password', 'Password must be at least 6 characters long').trim().isLength({ min: 6 })
];
