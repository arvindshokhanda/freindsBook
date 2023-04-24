const Comment  = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
commentEmailWorker = require('../worker/comment_email_worker');
module.exports.create = async function(req, res){
    try{
        let post  = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            comment  = await comment.populate('user', 'name email ');
            //commentMailer.newComment(comment);
            let job  = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in creating a queue');
                }
                console.log("this is the jobID",job.id); 
            })
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment!"
                })
            }
           
          
            res.redirect('/');
        }
    }catch(err){
        console.log("error", err);
        return;
    }
    
};

module.exports.destroy = async function(req, res){
    try{
        let comment  = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id 
                   },
                   message: "comment deleted!"
                })
            }
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("error", err);
        return;
    }
   
}