var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pxc3536:hanover.7380@cluster0-c1ggi.mongodb.net/react-blog-mailer?retryWrites=true", {useNewUrlParser: true});

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

var users = [
        {
            "name": "Paul Chang",
            "username": "numberone",
            "email": "emailtrackingapp3536@gmail.com"
        },
                {
            "name": "Joseph Chang",
            "username": "react123",
            "email": "emailtrackingapp3536@gmail.com"
        },
                {
            "name": "Irene Chang",
            "username": "nodejs123",
            "email": "emailtrackingapp3536@gmail.com"
        },
                {
            "name": "Noom",
            "username": "noomadmin",
            "email": "emailtrackingapp3536@gmail.com"
        },
                {
            "name": "Michael Jordan",
            "username": "goat",
            "email": "emailtrackingapp3536@gmail.com"
        }
    ];
    
for(var key in users){
    new User(users[key])
      .save()
      .catch((err)=>{
        console.log(err.message);
      });
}