var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/react-blog-server", {useNewUrlParser: true});

var userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    posts: [
        {
            title: String,
            body: String,
            author: String,
            status: String,
            postid: String
        }
    ]
});

var User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);

