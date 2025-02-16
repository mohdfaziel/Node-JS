const express = require("express");
const app = express();
const port = 3000;
app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`);
});
app.use((req,res)=>
{
    console.log("Request is coming");
    res.send(
        "<div><h1>Express</h1><p>Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.</p></div>"
    );
})