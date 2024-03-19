const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/userModel');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

exports.strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub).select('-password');

    if (!user) return done(null, false);

    return done(null, user);
  } catch (err) {
    done(err, null);
  }
});
