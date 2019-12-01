var express = require("express"),
router = express.Router(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");
var cors = require('cors');
var Post = require("../models/post.js");
var User = require("../models/user.js");
var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");

router.get('/:userid/:userPostid/tracker.png', function(req, res, next) {
    User.findOneAndUpdate(
        { "_id": req.params.userid, "posts._id": req.params.userPostid },
        { 
            "$set": {
                "posts.$.status": "Read"
            }
        },
        (err, post) => {
            if(err) return res.json({ success: false, error: err });
            else console.log(post)
        }
    );
    
});


// EDIT ROUTE
router.post("/posts/:id/send", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.json({ success: false, error: err });
        } else {
            for (let i=0; i < req.body.length; i++){
                User.findById(req.body[i]._id, function(err, foundUser) {
                    foundUser.posts.push(
                            {
                                postid: foundPost._id,
                                title: foundPost.title,
                                body: foundPost.body,
                                author: foundPost.author,
                                status: "Not Read"
                            }
                        );

                    foundUser.save((err, user) => {
                        let userPostid = user.posts[user.posts.length-1]._id;
                        sendEmailToUser(foundUser._id, foundUser.email, userPostid, foundPost.title, foundPost.body, foundPost.author);
                    });
                    
                    
                })
            }
            res.json({ success: true });
        }
    });
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'emailtrackingapp3536',
        pass: 'Testing123!'
    }
});

function sendEmailToUser(userid, email, userpostid, title, body, author) {
    ejs.renderFile("./views/emailTemplates/article.ejs", 
        { title: title, body: body, author: author, userid: userid, userpostid: userpostid }, 
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: 'emailtrackingapp3536@gmail.com',
                    to: email,
                    subject: title,
                    html: data
                };
                console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
            });
        }






module.exports = router;
