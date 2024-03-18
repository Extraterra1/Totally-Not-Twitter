const { default: mongoose, Schema } = require('mongoose');

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    imgUrl: {
      type: String
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    ],
    tweetType: {
      type: String,
      enum: ['tweet', 'retweet', 'reply'],
      default: 'tweet'
    },
    replyTo: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Tweet',
      default: null
    },
    retweetedTweet: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Tweet',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tweet', tweetSchema);
