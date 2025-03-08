const mongoose = require("mongoose");
const Chat = require("./models/chat");
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database");
  }
}
connect();

const allChats = [
    {
        from: "Alice",
        to: "Bob",
        msg: "Hello Bob",
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Hello Alice",
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "How are you?",
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "I am good",
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "Bye",
    },
];

Chat.insertMany(allChats);