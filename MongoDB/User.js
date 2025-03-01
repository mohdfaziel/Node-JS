const mongoose = require('mongoose');

main().then((res)=>
{
    console.log("Connected to database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Test');
}

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age must be at most 100"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const User = mongoose.model('User',userSchema);

  const user1 = new User({
    name: "Faziel",
    email: "mohdfazel969@gmail.com",
    password: "Faz@1193",
    age: 21,
  })
  user1.save().then((res)=> console.log(res)).catch(err => console.log(err));