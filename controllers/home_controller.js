const Post = require('../models/post');
const User  = require('../models/user');

module.exports.home = function(req, res){

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
    User.find({}, function(err, user){
        return res.render('home',{
            title:"friendsBook | Home",
            post: post,
            all_users: user
        });
    })
    
   })
}


