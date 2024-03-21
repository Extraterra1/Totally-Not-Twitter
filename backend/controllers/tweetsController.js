const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');

exports.createTweet = [
  body('content')
    .if(body('tweetType').isIn(['tweet', 'reply']))
    .notEmpty()
    .withMessage('Tweet cannot be empty')
    .isString()
    .withMessage('Invalid Content Type'),
  body('tweetType', 'Invalid Tweet Type').optional().isString().isIn(['tweet', 'retweet', 'reply']),
  body('replyTo').if(body('tweetType').equals('reply')).isMongoId().withMessage('Invalid Tweet ID').notEmpty().withMessage('Reply ID cannot be empty'),
  body('retweetedTweet')
    .if(body('tweetType').equals('retweet'))
    .isMongoId()
    .withMessage('Invalid Tweet ID')
    .notEmpty()
    .withMessage('Retweet ID cannot be empty'),
  asyncHandler(async (req, res) => {
    // Body Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ err: errors.array(), type: 'bodyValidation' });

    res.json({ msg: 'nice' });
  })
];
