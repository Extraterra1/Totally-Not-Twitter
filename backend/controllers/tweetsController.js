const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');

exports.createTweet = [
  body('content', 'Invalid Content Type')
    .optional()
    .isString()
    .if(body('tweetType').isIn(['tweet', 'reply']))
    .notEmpty()
    .withMessage('Tweet cannot be empty'),
  body('tweetType', 'Invalid Tweet Type').optional().isString().isIn(['tweet', 'retweet', 'reply']),
  body('replyTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid Tweet ID')
    .if(body('tweetType').equals('reply'))
    .notEmpty()
    .withMessage('Reply ID cannot be empty'),
  body('retweetedTweet')
    .optional()
    .isMongoId()
    .withMessage('Invalid Tweet ID')
    .if(body('tweetType').equals('retweet'))
    .notEmpty()
    .withMessage('Retweet ID cannot be empty')
];
