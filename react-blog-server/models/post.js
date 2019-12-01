var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String,
    
});


module.exports = mongoose.model("Post", postSchema);