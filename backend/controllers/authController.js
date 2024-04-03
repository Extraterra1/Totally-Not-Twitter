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
  body('displayName').trim().isLength({ min: 2, max: 15 }).withMessage('Display Name must be between 2 and 15 characters long').optional(),
  body('password', 'Password must be at least 6 characters long').trim().isLength({ min: 6 }),
  asyncHandler(async (req, res) => {
    // Check for errors in body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      displayName: req.body.displayName
    });
    await newUser.save();

    const cleanUser = { _id: newUser._id, email: newUser.email, username: newUser.username, friends: newUser.friends, displayName: newUser.displayName };

    jwt.sign({ user: cleanUser, exp: moment().add(3, 'days').unix(), sub: cleanUser._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) return res.status(500).json({ err });
      return res.json({ token, user: cleanUser });
    });
  })
];

exports.loginPOST = [
  body('username', 'Bad request').trim().isLength({ min: 2 }),
  body('password', 'Bad request').isLength({ min: 1 }),
  asyncHandler(async (req, res) => {
    // Check for errors in body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }]
    });

    if (!user) return res.status(401).json({ err: { message: 'Wrong username/password' } });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(401).json({ err: { message: 'Wrong username/password' } });

    const cleanUser = {
      email: user.email,
      username: user.username,
      role: user.role,
      _id: user._id,
      profilePic: user.profilePic,
      displayName: user.displayName
    };

    jwt.sign({ user: cleanUser, exp: moment().add(3, 'days').unix(), sub: cleanUser._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) return res.status(500).json({ err });
      return res.json({ token, user: cleanUser });
    });
  })
];

exports.protectedRoute = (req, res) => {
  return res.json({ msg: 'Authenticated' });
};
