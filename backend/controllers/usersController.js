const asyncHandler = require('express-async-handler');
const isValidObjectID = require('mongoose').Types.ObjectId.isValid;

exports.followUser = asyncHandler((req, res) => {
  const userID = req.params.id;

  if (!isValidObjectID(userID)) return res.status(400).json({ err: 'Invalid User ID' });
});
