const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Importing UUID for unique post IDs
const methodOverride = require('method-override'); // Middleware to support PUT & DELETE requests from forms

const app = express();
const port = 3000;
const path = require('path');

// Setting up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(methodOverride('_method')); // Allows overriding HTTP methods via query parameter
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parses JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files (CSS, JS, etc.)

// Sample database (in-memory array for storing posts)
let dataBase = [
    { id: uuidv4(), username: "david", content: "Today I went to the zoo" },
    { id: uuidv4(), username: "sunil", content: "My first day at college" },
    { id: uuidv4(), username: "kumar", content: "I love to play cricket" },
    { id: uuidv4(), username: "rahul", content: "I am a web developer" },
    { id: uuidv4(), username: "sachin", content: "I am a cricketer" }
];

// Route to display all posts
app.get("/posts", (req, res) => {
    res.render("index", { dataBase });
});

// Route to render the edit form for a specific post
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = dataBase.find((p) => p.id === id);
    res.render("update", { post });
});

// Route to handle updating a post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const newContent = req.body.content;
    const post = dataBase.find((p) => p.id === id);
    if (post) {
        post.content = newContent; // Update post content
    }
    res.redirect("/posts");
});

// Route to handle deleting a post
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    dataBase = dataBase.filter((p) => p.id !== id); // Remove post from array
    res.redirect("/posts");
});

// Route to render the form for creating a new post
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Route to show details of a specific post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = dataBase.find((p) => p.id === id);
    res.render("show", { post });
});

// Route to handle creating a new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    dataBase.push({ username, content, id: uuidv4() }); // Add new post with unique ID
    res.redirect("/posts");
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
