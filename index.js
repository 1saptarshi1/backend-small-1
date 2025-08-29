const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("viwes", path.join(__dirname, "viwes"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Hachiman Hikigaya",
        content: "Cynical, sharp-witted loner who hides behind sarcasm; paradoxical thinker, socially awkward yet deeply empathetic, often sacrificing himself for others’ peace.",

    },
    {
        id: uuidv4(),
        username: "Yukino Yukinoshita",
        content: "Intelligent, coldly blunt, and elegant; hides vulnerability behind harsh words; secretly yearns for connection despite her perfectionist and prideful exterior.",

    },
    {
        id: uuidv4(),
        username: "Yui Yuigahama",
        content: "Cheerful, kindhearted, and supportive; struggles with insecurity and desire for acceptance; values friendship deeply, even when masking her true feelings.",

    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
} );

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
} );

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
} );

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    post.content = req.body.content;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/post/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listaning to port : 8080");
});