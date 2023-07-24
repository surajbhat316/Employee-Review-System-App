const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use( new LocalStrategy({
        usernameField: 'email'
    },async function(email,password, done){
        try {
            let user = await User.findOne({email : email});
            if(!user || user.password != password){
                console.log("Invalid Username- Password");
                return done(null, false);
            }else{
                return done(null, user);
            }
        } catch (error) {
            console.log("error in finding user", error);
            return done(error);
        }
    }

));


// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// Deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log("error in finding user", error);
        return done(error);
    }
});


// Check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    // If the user is signed in then pass on the request to the next function
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;