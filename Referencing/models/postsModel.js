const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  user: {
    //This is the type of ID
    type: mongoose.Schema.Types.ObjectId,
    //This means that the aboive id should be searched in the user model
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
