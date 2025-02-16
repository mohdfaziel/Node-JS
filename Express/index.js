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
    res.send("You are at home page");
})

app.get("/about",(req,res)=>{
    res.send("You are at about page");
})

app.get("/contact",(req,res)=>{
    res.send("You are at contact page");
})

app.get("*",(req,res)=>{
    res.send("Enter valid route");
})

app.post("/login",(req,res)=>{
    res.send("Login Successfully");
});