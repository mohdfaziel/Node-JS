const mongoose = require('mongoose');

main().then((res)=>
{
    console.log("Connected to database",res);
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Test');
}

const studentSchema = new mongoose.Schema({
    name:String,
    branch:String,
    rollno:Number,
    age:Number
})

const Student = mongoose.model('Student',studentSchema);

// const st1 = new Student({
//     name:"Faziel",
//     branch:"CSE",
//     rollno:1,
//     age:21
// })

// st1.save().then((res)=> console.log(res)).catch(err => console.log(err));

// Student.insertMany( [
//     { name: "Faziel", branch: "CSE", rollno: 1, age: 21 },
//     { name: "Ayesha", branch: "ECE", rollno: 2, age: 22 },
//     { name: "Rahul", branch: "ME", rollno: 3, age: 23 },
//     { name: "Zain", branch: "IT", rollno: 4, age: 20 }
//   ]).then((res)=> console.log(res)).catch(err => console.log(err));

// Student.findById("67c2e3a8174e0726a98a8da7").then((res)=> console.log(res)).catch(err => console.log(err));

Student.findOneAndUpdate({name:"Faziel"},{name:"Faziel Shaikh"}, {new:true}).then((res)=> console.log(res)).catch(err => console.log(err));

Student.findByIdAndUpdate("67c2e3a8174e0726a98a8da7",{age:24}, {new:true}).then((res)=> console.log(res)).catch(err => console.log(err));