const asyncHandler = require('express-async-handler');
const isValidObjectID = require('mongoose').Types.ObjectId.isValid;
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
