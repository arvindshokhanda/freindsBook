const passport = require('passport');
const googleStrategy  = require('passport-google-oauth').OAuth2Strategy;
const crypto =  require('crypto');  
const User = require('../models/user');

//tell passport to use this strategy

passport.use(new googleStrategy({
        clientID: "453734706426-q1qb68at5f2fja5oqv3sfp9d334re7c7.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy passsport', err); return;}

            if(user){
                //if find set the user as req.user
                return done(null, user);
            }else{
                User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },
                    function(err, user){
                        if(err){
                            console.log('error in creating user in google strategy passport', err);return; 
                        }
                        return done(null, user);    
                    }
                )
            }
        })
    }
))
module.exports = passport;
