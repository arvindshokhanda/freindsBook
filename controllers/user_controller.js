const User = require('../models/user')
module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title:"Profile"
    });
}

//action for signUp page

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title:" FriendsBook | sign-up"
    })
}

//action for signIn page

module.exports.signIn = function(req, res){
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
//creatind the  session
module.exports.createSession = function(req, res){
    //To do later
}