const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/socialMedia");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database");
  }
}
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Embedding API!");
});

app.post("/signup",async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: "Please provide all fields"});
    }
    const passHash = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,password: passHash});
    res.status(200).send(user);
});
app.post("/login",async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "Please provide all fields"});
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new Error("Login: User not found");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({message: "Invalid credentials"});
    }
    res.status(200).send(user);
});

app.post("/:username/posts/create",async (req,res) => {
    const {title, caption} = req.body;
    if(!title || !caption) {
        return res.status(400).send("Please provide all fields");
    }
    const {username} = req.params;
    const user = await User.findOne({name: username});
    if(!user) {
        return res.status(404).send("User not found");
    }
    user.posts.push({title, caption});
    await user.save();
    console.log(user.posts);
    res.status(200).send(user.posts);

});
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});