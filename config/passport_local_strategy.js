const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        // find the user and established the identity
        User.findOne({email:email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username');
                return done(null, false);
            }
            return done(null, user);
        })
    }
))


//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deSerializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('err in findin user');
            return done(err);
        }
        return done(null, user);
    })
})

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this for the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;