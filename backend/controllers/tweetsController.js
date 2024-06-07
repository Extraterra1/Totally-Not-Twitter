const asyncHandler = require('express-async-handler');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const path = require('path');
const { isValidObjectId } = require('mongoose');
const cloudinary = require('cloudinary').v2;

exports.createTweet = [
  upload.single('img'),
  body('content')
    .if(body('tweetType').isIn(['tweet', 'reply']))
    .notEmpty()
    .withMessage('Tweet cannot be empty'),
  body('content').if(body('tweetType').equals('retweet')).isEmpty().withMessage('Retweets cannot have content'),
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

      if (req.body.tweetType === 'reply' && tweet.tweetType === 'retweet') return res.status(400).json({ err: 'You cannot reply to a retweet' });
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

    console.log(req.file);
    console.log(image);

    const { content, tweetType, replyTo, retweetedTweet } = req.body;
    const author = req.user._id;

    const newTweet = new Tweet({ author, content, tweetType, replyTo, retweetedTweet, imgUrl: image ? image.url : null });
    await newTweet.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { tweets: newTweet._id } });

    const populatedTweet = await newTweet.populate([
      { path: 'replyTo', populate: { path: 'author', select: '_id displayName username profilePic' } },
      { path: 'retweetedTweet', populate: { path: 'author', select: '_id displayName username profilePic' } },
      { path: 'author', select: 'displayName username profilePic' }
    ]);

    return res.json({ tweet: populatedTweet });
  })
];

exports.likeTweet = asyncHandler(async (req, res) => {
  const tweetID = req.params.id;

  const tweet = await Tweet.findById(tweetID);
  if (!tweet) return res.status(404).json({ err: 'Tweet not found' });

  const alreadyLiked = await Tweet.findOne({ _id: tweetID, likes: req.user._id });

  const updatedTweet = await Tweet.findByIdAndUpdate(tweetID, alreadyLiked ? { $pull: { likes: req.user._id } } : { $addToSet: { likes: req.user._id } }, {
    new: true
  });

  return res.json({ updatedTweet });
});

exports.getTweetsByUser = asyncHandler(async (req, res) => {
  let user;

  if (isValidObjectId(req.params.id)) {
    user = await User.findById(req.params.id);
  } else {
    user = await User.findOne({ username: req.params.id });
  }

  if (!user) return res.status(404).json({ err: 'User not found' });

  const tweets = await Tweet.find({ author: user._id })
    .populate({ path: 'replyTo retweetedTweet', populate: { path: 'author', select: '_id displayName username profilePic' } })
    .populate('author', 'displayName username profilePic')
    .sort({ createdAt: -1 });
  return res.json({ tweets, count: tweets.length });
});

exports.searchTweets = [
  query('q', 'You need to provide a search term!').trim().notEmpty(),
  asyncHandler(async (req, res) => {
    // Query Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ err: errors.array(), type: 'bodyValidation' });

    const { q: query } = req.query;
    const tweets = await Tweet.find({ tweetType: { $in: ['tweet', 'reply'] }, content: { $regex: query, $options: 'i' } })
      .sort({ createdAt: -1 })
      .populate({ path: 'replyTo retweetedTweet', populate: { path: 'author', select: '_id displayName username profilePic' } })
      .populate('author', 'displayName username profilePic');

    return res.json({ count: tweets.length, tweets });
  })
];

exports.searchUsers = [
  query('q', 'You need to provide a search term!').trim().notEmpty(),
  asyncHandler(async (req, res) => {
    // Query Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ err: errors.array(), type: 'bodyValidation' });

    const { q: query } = req.query;

    const users = await User.find({ $or: [{ username: { $regex: query, $options: 'i' } }, { displayName: { $regex: query, $options: 'i' } }] }).select(
      'username displayName profilePic'
    );
    return res.json({ users });
  })
];

exports.getTimeline = [
  body('offset', 'Offset must be a number').optional().trim().isNumeric(),
  asyncHandler(async (req, res) => {
    // Body Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ err: errors.array(), type: 'bodyValidation' });

    if (req.user._id.toString() !== req.params.id) return res.status(401).json({ err: 'Token does not match provided id' });

    const offset = req.body.offset || null;
    const user = await User.findById(req.user._id).select('following');

    const tweets = await Tweet.find({ author: { $in: [...user.following, user._id] } })
      .skip(offset)
      .sort({ createdAt: -1 })
      .populate({ path: 'replyTo retweetedTweet', populate: { path: 'author', select: '_id displayName username profilePic' } })
      .populate('author', 'displayName username profilePic');

    return res.json({ count: tweets.length, tweets });
  })
];

exports.tweetDetail = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;

  if (!isValidObjectId(tweetId)) return res.status(404).json({ err: 'Tweet not found' });

  const tweet = await Tweet.findById(tweetId)
    .populate({ path: 'replyTo retweetedTweet', populate: { path: 'author', select: '_id displayName username profilePic' } })
    .populate('author', 'displayName username profilePic');

  if (!tweet) return res.status(404).json({ err: 'Tweet not found' });

  const repliesId = tweet.tweetType !== 'retweet' ? tweet._id : tweet.retweetedTweet;

  const replies = await Tweet.find({ replyTo: repliesId }).populate('author', 'displayName username profilePic').sort({ createdAt: -1 });

  return res.json({ tweet, replies });
});

exports.getExplore = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({ tweetType: 'tweet' }).limit(30).sort({ createdAt: -1 }).populate('author', 'displayName username profilePic');

  return res.json({ tweets });
});

exports.getLikedTweets = asyncHandler(async (req, res) => {
  let user;

  if (isValidObjectId(req.params.id)) {
    user = await User.findById(req.params.id);
  } else {
    user = await User.findOne({ username: req.params.id });
  }

  if (!user) return res.status(404).json({ err: 'User not found' });

  const tweets = await Tweet.find({ likes: user._id })
    .populate({ path: 'replyTo', populate: { path: 'author', select: '_id displayName username profilePic' } })
    .populate('author', 'displayName username profilePic')
    .sort({ createdAt: -1 });

  return res.json({ count: tweets.length, tweets });
});
