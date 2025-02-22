const express = require('express');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

const app = express();
const port = 3000;
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let dataBase = [
    {
        id: uuidv4(),
        username: "david",
        content: "Today i went to zoo"
    },
    {
       id: uuidv4(),
        username: "sunil",
        content: "My first day at college"
    },
    {
        id: uuidv4(),
        username: "kumar",
        content: "I love to play cricket"
    },
    {
        id: uuidv4(),
        username: "rahul",
        content: "I am a web developer",
    },
    {
       id: uuidv4(),
        username: "sachin",
        content: "I am a cricketer"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index",{dataBase});
});
app.get("/posts/:id/edit",(req,res)=>{
    const { id } = req.params;
    const post = dataBase.find((p) => p.id === id);
    res.render("update", { post });
});
app.patch("/posts/:id",(req,res)=>{
    const {id} = req.params;
    const newContent = req.body.content;
    const post = dataBase.find((p)=> p.id === id);
    post.content = newContent;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    const {id} = req.params;
    dataBase = dataBase.filter((p)=> p.id !== id);
    res.redirect("/posts");
});
app.get("/posts/new",(req,res)=>{
    res.render("new");
});
app.get("/posts/:id",(req,res)=>{
    const {id} = req.params;
    const post = dataBase.find((p)=> p.id === id);
    res.render("show",{post});
});

app.post("/posts",(req,res)=>{
    const {username,content} = req.body;
    dataBase.push({username,content,id:uuidv4()});
    res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
