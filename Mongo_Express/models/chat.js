const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength : [50 , "Message is too long"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date
  }
});
 
const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;