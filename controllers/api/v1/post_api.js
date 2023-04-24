const Post = require('../../../models/post');
const Comment  = require('../../../models/comment')
module.exports.index = async function(req, res){

    let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
                path: 'comments',
                populate: {
                    path: "user"
                }
        })

    return res.json(200, {
        message: 'list of post',
        posts: post
    })
}
module.exports.destroy = async function(req, res){
    try{
        let post  =  await Post.findById(req.params.id)
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});
            return res.json(200, {
                message: "Post and associated comment deleted"
            });
        }else{
            return res.json(401, {
                message: 'you cannot delete this post'
            });
        }
    }catch(err){
        console.log("**************error", err);
        return res.json(500, {
            message: 'Internal server error'
        });
    }
   
}