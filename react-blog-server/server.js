var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");
var cors = require('cors');
var Post = require("./models/post.js");
var User = require("./models/user.js");

var emailRoutes = require("./routes/emailRoutes.js")


//APP CONFIG
var url = process.env.DATABASEURL;
mongoose.connect(url, {useNewUrlParser: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//RESTFUL ROUTES
app.get("/", function(req, res){
    res.send("Hello World");
})


app.get('/posts', (req, res, next) => {
  return Post.find()
    .then((posts) => res.json({ posts: posts.map(post => post.toJSON()) }))
    .catch(next);
});


//CREATE ROUTE
app.post("/posts", function(req, res){
    //create post
    let post = new Post(req.body);
    post.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
  });
    
});

// SHOW ROUTE
app.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/posts");
        } else {
            res.json(foundPost);
        }
    });
});

// EDIT ROUTE
app.get("/posts/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/posts");
        } else {
            res.json(foundPost)
        }
    });
});

// UPDATE ROUTE
app.put("/posts/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, updatedPost){
        if(err){
            console.log(err);
        } else {
            return res.json({ success: true });
        }
    })
})

// DELETE ROUTE
app.delete("/posts/:id", function(req, res){
    //destroy blog
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true });
        }
    })
    //redirect somewhere
})


// User Routes
app.get("/users", (req, res, next) => {
    return User.find()
    .then((users) => res.json(users.map(user => user.toJSON()) ))
    .catch(next);
})

// USER SHOW ROUTE
app.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            res.json({ success: false, error: err });
        } else {
            res.json(foundUser);
        }
    });
});


app.use("/", emailRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Running");
})

