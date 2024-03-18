const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    followers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    tweets: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Tweet' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
