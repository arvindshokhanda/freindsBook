const Post = require('../models/post');
const User  = require('../models/user');

module.exports.home = async function(req, res){

    try{
                //populate the each user
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
                path: 'comments',
                populate: {
                    path: "user"
                }
        })
        let user = await User.find({});
            return res.render('home',{
                title:"friendsBook | Home",
                post: post,
                all_users: user
            });
    }catch(err){
        console.log("error", err);
        return;
    }
   

}


