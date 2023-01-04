const { findOne } = require('../models/user');
const User = require('../models/user')
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'profile',
            profile_user: user
        });
    })
   
}
module.exports.update = async function(req, res){

    try {
        if(req.user.id == req.params.id){
            let user  = await User.findById(req.params.id)
            User.uploadAvatar(req, res, function(err){
                if(err){
                    console.log('****Multer error', err);
                }
               user.name = req.body.name;
               user.email = req.body.email;
               if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar),function(err){
                            if(err){
                                console.log('error', err);
                                return res.redirect('back');
                            }
                        });
                    }
                    user.avatar = User.avatarPath + '/' +req.file.filename; 
                }
                user.save();
                return res.redirect('back');
            })
        }else{
            return res.status(401).send('UnAuthorized');
        }
    } catch (error) {
        req.flash('err', err);
        return res.redirect('back');
    }
   
}

//action for signUp page

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title:" FriendsBook | sign-up"
    })
}

//action for signIn page

module.exports.signIn = function(req, res){
    
      if(req.isAuthenticated()){
            return res.redirect('/users/profile');
      }
     
    return res.render('user_sign_in', {
        title:" FriendsBook | sign-in"
    })
}

//creating action for signup
module.exports.create = function(req, res){
   if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
   }
   User.findOne({email: req.body.email}, function(err, user){
    if(err){console.log('error in finiding the user');return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error while creating a user');return}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
   })
}
//sign in and create a session for th user

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return console.log(err);
        }
        req.flash('success', 'Logged out Successfully');
        return res.redirect('/');
    });
    
}