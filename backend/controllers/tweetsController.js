const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const path = require('path');
const cloudinary = require('cloudinary').v2;

exports.createTweet = [
  upload.single('img'),
  body('content')
    .if(body('tweetType').isIn(['tweet', 'reply']))
    .notEmpty()
    .withMessage('Tweet cannot be empty'),
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

    // cloudinary configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (req.body.tweetType === 'retweet' || req.body.tweetType === 'reply') {
      const id = req.body.tweetType === 'retweet' ? req.body.retweetedTweet : req.body.replyTo;
      const tweet = await Tweet.findById(id);
      if (!tweet) return res.status(400).json({ err: 'Tweet not found' });
    }

    const image = fileExtension
      ? await new Promise((resolve) => {
          cloudinary.uploader
            .upload_stream((e, uploadResult) => {
              return resolve(uploadResult);
            })
            .end(req.file.buffer);
        })
      : null;

    const { content, tweetType, replyTo, retweetedTweet } = req.body;
    const author = req.user._id;

    const newTweet = new Tweet({ author, content, tweetType, replyTo, retweetedTweet, imgUrl: image ? image.url : null });
    await newTweet.save();

    return res.json({ tweet: newTweet });
  })
];
