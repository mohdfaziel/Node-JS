const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

userSchema.methods.getJWT = async function ()
{
  //inorder to use the this keyword in the function, we need to use simple function, not arrow function
  const user = this;
  const token = await jwt.sign({_id:user._id}, "Faz@123", {expiresIn: "1d"});
  return token;
}

userSchema.methods.validatePassword  = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}

module.exports = mongoose.model('User', userSchema);