const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'Welcome to the TTN API!' });
});

// AUTH
router.post('/register', authController.registerPOST);

module.exports = router;
