const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/authController');

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

router.post('/tweets', passport.authenticate('jwt', { session: false }), tweetController.createTweet);

module.exports = router;
