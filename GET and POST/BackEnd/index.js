const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/required",(req,res)=>{
    const {name} = req.query;
    res.send(`Hello ${name}`);
})

app.post("/required",(req,res)=>{
    const {name} = req.body;
    res.send(`Hello ${name}`);
});