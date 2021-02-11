//jshint esversion:6

//modules and dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

//Default Content for the Home, About, and Contact Page
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Use Express
const app = express();

app.set('view engine', 'ejs');

//Use bodyParser and create Public Folder for CSS
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connecting to Local MongoDB
mongoose.connect(process.env.DATABASE_LOGIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//Blog Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

//Blog Post Model
const Post = new mongoose.model("Post", postSchema);


//Get requests
app.get("/", function(req, res) {
  Post.find({}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {homeStartingContent: homeStartingContent, posts: results});
    }//end if/else
  });
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postId", function(req, res) {
  const requestedPost = req.params.postId;

  Post.findById(requestedPost, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.render("post", {postTitle: results.title, postContent: results.content});
    }//end if/else
  });
});

app.get("/delete", function(req, res){
  Post.find({}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.render("delete", {posts: results});
    }//end if/else
  });
});

//POST requests
app.post("/compose", function(req, res) {
  const title = req.body.postTitle;
  const content = req.body.postBody
  const newPost = new Post ({
    title: title,
    content: content
  });
  newPost.save(function(err){
    if(!err){
      res.redirect("/");
    }//end if
  });
});

app.post("/delete", function(req, res){
  const deletedPost = req.body.deleteButton;

  Post.deleteOne({_id: deletedPost}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Post successfully deleted.");
    }//end if/else
    res.redirect("/");
  });
});


let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully on port " + port);
});
