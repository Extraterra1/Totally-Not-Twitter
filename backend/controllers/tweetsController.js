const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const path = require('path');

exports.createTweet = [
  upload.single('img'),
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

    // Validate File Extension
    const fileExtension = req.file ? path.extname(req.file.originalname).toLowerCase() : null;
    if (fileExtension && fileExtension !== '.jpg' && fileExtension !== '.png' && fileExtension !== '.jpeg') {
      return res.status(400).json({ err: 'Wrong file format' });
    }

    // Validate File Size
    const fileSize = req.file ? req.file.size : null;
    if (fileSize && fileSize > 800000) return res.status(400).json({ err: 'File too large, must be 800kb or smaller' });

    res.json({ msg: 'nice' });
  })
];
