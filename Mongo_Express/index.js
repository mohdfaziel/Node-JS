const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const path = require("path");
//Models
const Chat = require("./models/chat");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database");
  }
}
connect();
//all chats
app.get("/chats",async (req,res)=>
{
  const chats =  await Chat.find({});
  res.render("index.ejs",{chats});
})
//create new chat
app.post("/chats",async (req,res)=>
{
  const {from,to,msg} = req.body;
  const cht = new Chat({from,to,msg});
  await cht.save();
  res.redirect("/chats");
})
app.get("/chats/new",(req,res)=>
{
  res.render("newChat.ejs");
})
//edit chat
app.get("/chats/:id/edit", async (req,res)=>
{
  const {id} = req.params;
  const chat = await Chat.findById(id);
  res.render("editChat.ejs",{chat});
})
//update chat
app.put("/chats/:id",async (req,res)=>
{
  const {id} = req.params;
  const {msg} = req.body;
  const UpdatedChat =await Chat.findByIdAndUpdate(id,{msg:msg, updated_at:new Date()},{runValidators:true, new:true});
  console.log("UpdatedChat", UpdatedChat);
  res.redirect("/chats");
})
//delete chat
app.delete("/chats/:id", async (req,res)=>
{
  const {id} = req.params;
  const deletedChat = await Chat.findByIdAndDelete(id);
  console.log("Deleted Chat",deletedChat);
  res.redirect("/chats");
})
//home
app.get("/", (req, res) => {
  res.send("Hello World");
});
