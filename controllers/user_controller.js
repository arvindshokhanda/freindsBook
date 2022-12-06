const { findOne } = require('../models/user');
const User = require('../models/user')

module.exports.profile = function(req, res){
//    if(req.cookies.user_id){
//         User.findById(req.cookies.user_id, function(err, user){
//             if(user){
//                 return res.render('user_profile',{
//                     title:"Profile",
//                     user: user
//                 });
//             }
//             return res.redirect('/users/sign-in');
//         });
//    }else{
//         res.redirect('/users/sign-in');
//    }
    return res.render('user_profile', {
        title: 'profile'
    });
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
//creating the  session
// module.exports.createSession = function(req, res){
//     //find the user 
//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finiding the user in signing in');return;}

//         if(user){
//             if(user.password != req.body.password){
//                 return res.redirect('back');
//             }
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');
//         }else{
//             return res.redirect('back');
//         }
//     })
// }
// Delete a session
// module.exports.deleteSession = function(req, res){
//     if(req.cookies.user_id){
//         res.clearCookie('user_id') ;
//         return res.redirect('/users/sign-in');
//     }else{
//         return res.redirect('back');;
//     }   
// }

//sign in and create a session for th user

module.exports.createSession = function(req, res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return console.log(err);
        }
    });
    
    return res.redirect('/');
}