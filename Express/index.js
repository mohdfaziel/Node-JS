const express = require("express");
const app = express();
const port = 3000;
app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`);
});
// app.use((req,res)=>
// {
//     console.log("Request is coming");
//     res.send(
//         "<div><h1>Express</h1><p>Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.</p></div>"
//     );
// })

app.get("/",(req,res)=>
{
    res.send("You are at main page");
})

app.get("/about",(req,res)=>{
    res.send("You are at about page");
})

app.get("/contact",(req,res)=>{
    res.send("You are at contact page");
})

app.post("/login",(req,res)=>{
    res.send("Login Successfully");
});

app.get("/search",(req,res)=>{
    const {name} = req.query
    const {age} = req.query
    const {sex} = req.query
    res.send(`<div>Your name is ${name}</div><div> Your age is ${age} </div> <div> Your gender is ${sex}</div>`);
})

