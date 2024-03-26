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

//  LIKE TWEET
router.patch('/tweets/:id/like', passport.authenticate('jwt', { session: false }), tweetsController.likeTweet);

// GET TWEETS BY USER
router.get('/users/:id/tweets', passport.authenticate('jwt', { session: false }), tweetsController.getTweetsByUser);

// ***************************
// USERS
//  **************************

// FOLLOW USER
router.patch('/users/:id/follow', passport.authenticate('jwt', { session: false }), usersController.followUser);

// UNFOLLOW USER
router.patch('/users/:id/unfollow', passport.authenticate('jwt', { session: false }), usersController.unfollowUser);

module.exports = router;
