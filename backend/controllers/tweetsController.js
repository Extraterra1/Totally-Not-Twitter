const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');

exports.createTweet = [
  body('content', 'Invalid Content Type').optional().isString(),
  body('tweetType', 'Invalid Tweet Type').optional().isString().isIn(['tweet', 'retweet', 'reply']),
  body('replyTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid Tweet ID')
    .custom(async (val) => await Tweet.findById(val))
    .withMessage('Tweet not Found')
];
