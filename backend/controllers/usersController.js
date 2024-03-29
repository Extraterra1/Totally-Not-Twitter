const asyncHandler = require('express-async-handler');
const isValidObjectID = require('mongoose').Types.ObjectId.isValid;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require('cloudinary').v2;
const path = require('path');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

exports.followUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;

  if (!isValidObjectID(userID)) return res.status(400).json({ err: 'Invalid User ID' });

  const user = await User.findById(userID);
  if (!user) return res.status(404).json({ err: 'User not found' });

  const updatedUser = await User.findByIdAndUpdate(req.params.id, { $addToSet: { followers: req.user._id } }, { new: true });

  return res.json({ updatedUser });
});

exports.unfollowUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;

  if (!isValidObjectID(userID)) return res.status(400).json({ err: 'Invalid User ID' });

  const user = await User.findById(userID);
  if (!user) return res.status(404).json({ err: 'User not found' });

  const updatedUser = await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } }, { new: true });

  return res.json({ updatedUser });
});

exports.updateUser = [
  upload.single('img'),
  body('displayName')
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Display name cannot be empty')
    .isLength({ max: 15 })
    .withMessage('Display Name cannot be longer than 15 characters'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .if(body('password').notEmpty())
    .notEmpty()
    .withMessage('Confirm Password cannot be empty')
    .equals(body('password').value)
    .withMessage('Passwords do not match')
    .if(body('password').isEmpty())
    .bail(),
  asyncHandler(async (req, res) => {
    // Body Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ err: errors.array(), type: 'bodyValidation' });

    return res.json({ msg: 'nice' });
  })
];
