const mongoose = require("mongoose");
const joi = require("joi");
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

function validateData(data)
{
  const schema = joi.object({
    from: joi.string().required(),
    to: joi.string().required(),
    msg: joi.string().max(50).required()

  });

  const { error } = schema.validate(data);
  return error;
}

const Chat = mongoose.model("Chat",chatSchema);
module.exports = {Chat, validateData};