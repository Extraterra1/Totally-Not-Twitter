const asyncHandler = require('express-async-handler');
const isValidObjectID = require('mongoose').Types.ObjectId.isValid;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require('cloudinary').v2;
const path = require('path');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
    const { displayName, password } = req.body;

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

    const image = fileExtension
      ? await new Promise((resolve) => {
          cloudinary.uploader
            .upload_stream((e, uploadResult) => {
              return resolve(uploadResult);
            })
            .end(req.file.buffer);
        })
      : null;

    const user = await User.findById(req.user._id);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (password && !isValidPassword) return res.status(401).json({ err: { message: 'Wrong password' } });

    const itemsToUpdate = {};
    if (displayName) itemsToUpdate.displayName = displayName;
    if (image) itemsToUpdate.profilePic = image.url;
    if (isValidPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      itemsToUpdate.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, itemsToUpdate, { new: true });

    return res.json({ updatedUser });
  })
];
