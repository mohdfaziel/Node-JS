const express = require("express");
const path = require("path");
const app = express();

const port = 3000;
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.get("/ig/:username",(req,res)=>
{
    const info = require("./data.json");
    const {username} = req.params;
    res.render("instagram.ejs",{username,info});
})
app.listen(port,()=>
    {
        console.log(`Server is running on port ${port}`);
    })