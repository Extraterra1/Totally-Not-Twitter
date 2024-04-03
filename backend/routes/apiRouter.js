const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/authController');
const tweetsController = require('../controllers/tweetsController');
const usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'Welcome to the TTN API!' });
});

// Mockup Protected Route
router.get('/protected', passport.authenticate('jwt', { session: false }), authController.protectedRoute);

// ***************************
// AUTH
//  **************************

// REGISTER
router.post('/register', authController.registerPOST);

// LOGIN
router.post('/login', authController.loginPOST);

// ***************************
// TWEETS
//  **************************

//  CREATE TWEET
router.post('/tweets', passport.authenticate('jwt', { session: false }), tweetsController.createTweet);

// GET TWEET DETAIL
router.get('/tweets/:id', tweetsController.tweetDetail);

//  LIKE TWEET
router.patch('/tweets/:id/like', passport.authenticate('jwt', { session: false }), tweetsController.likeTweet);

// GET TWEETS BY USER
router.get('/users/:id/tweets', tweetsController.getTweetsByUser);

// GET TWEETS LIKED BY USER
router.get('/users/:id/liked', tweetsController.getLikedTweets);

// GET TIMELINE
router.get('/users/:id/timeline', passport.authenticate('jwt', { session: false }), tweetsController.getTimeline);

// SEARCH TWEETS
router.get('/tweets/search', tweetsController.searchTweets);

// SEARCH USERS
router.get('/tweets/search/users', tweetsController.searchUsers);

// EXPLORE TAB
router.get('/explore', tweetsController.getExplore);

// ***************************
// USERS
//  **************************

// FOLLOW USER
router.patch('/users/:id/follow', passport.authenticate('jwt', { session: false }), usersController.followUser);

// UNFOLLOW USER
router.patch('/users/:id/unfollow', passport.authenticate('jwt', { session: false }), usersController.unfollowUser);

// UPDATE USER
router.patch('/users/:id', passport.authenticate('jwt', { session: false }), usersController.updateUser);

// GET RECOMMENDED USERS
router.get('/users/', passport.authenticate('jwt', { session: false }), usersController.getUsers);

module.exports = router;
