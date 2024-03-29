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

  body('newPassword').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .if(body('newPassword').notEmpty())
    .notEmpty()
    .withMessage('Confirm Password cannot be empty')
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage('Passwords do not match')
    .if(body('newPassword').isEmpty())
    .bail(),
  body('password', 'Password must be a string')
    .if(body('newPassword').notEmpty())
    .notEmpty()
    .withMessage('Password cannot be empty')
    .if(body('newPassword').isEmpty())
    .bail(),
  asyncHandler(async (req, res) => {
    // Body Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ err: errors.array(), type: 'bodyValidation' });

    // Validate File Extension
    const fileExtension = req.file ? path.extname(req.file.originalname).toLowerCase() : null;
    if (fileExtension && fileExtension !== '.jpg' && fileExtension !== '.png' && fileExtension !== '.jpeg') {
      return res.status(400).json({ err: 'Wrong file format' });
    }

    // Validate File Size
    const fileSize = req.file ? req.file.size : null;
    if (fileSize && fileSize > 800000) return res.status(400).json({ err: 'File too large, must be 800kb or smaller' });

    const { displayName } = req.body;

    const itemsToUpdate = {};
    if (displayName) itemsToUpdate.displayName = displayName;

    return res.json({ msg: 'nice' });
  })
];
