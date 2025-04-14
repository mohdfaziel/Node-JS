const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Post = require("./models/postsModel");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Referencing");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database");
  }
}
connect();

app.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("Please provide all fields");
  }
  const user = await User.create({ name, email, password });
  res.status(200).send(user);
});

app.post("/:username/posts/create", async (req, res) => {
  const { title, caption } = req.body;
  const username = req.params.username;
  //Getting the user
  const user = await User.findOne({ name: username });
  if (!user) {
    return res.status(404).send("User not found, Please Login First");
  }
  if (!title || !caption) {
    return res.status(400).send("Please provide all fields");
  }
  //here we are setting the user id in the post model
  const post = await Post.create({ user: user._id, title, caption });
  //here we are storing the post id in the posts array of the user so that we can easily find all the posts of the user.
  user.posts.push(post._id);
  await user.save();
  res.status(200).send({user,post});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
