const Post = require('../models/post');
const User  = require('../models/post');

module.exports.home = function(req, res){
    // res.end('<h1>My express server is running and up</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 25)

    // Post.find({}, function(err, post){
    //     return res.render('home',{
    //         title:"friendsBook | Home",
    //         post: post
    //     });
    // })

    //populate the each user
   Post.find({})
   .populate('user')
   .populate({
        path: 'comments',
        populate: {
            path: "user"
        }
   })
   .exec(function(err, post){
    return res.render('home',{
        title:"friendsBook | Home",
        post: post
    });
   })
}


