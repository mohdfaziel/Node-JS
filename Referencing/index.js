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
app.get("/posts",async (req,res)=>{
    //Here we are getting all the posts along with their user details, as we are converting the user id to the user information
  const posts = await Post.find().populate("user");
  res.status(200).send(posts);
});
app.get("/:username/posts", async (req, res) => {
    const username = req.params.username;
    //here we are getting all the users along with their posts details, as we are converting the post id to the post information
    const user = await User.find().populate("posts");
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
