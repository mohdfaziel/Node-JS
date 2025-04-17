const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title : {
            type: String,
            required: true,
        },
        caption : {
            type: String,
            required: true,
        },
        date : {
            type: Date,
            default: Date.now,
        },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts :[postSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);