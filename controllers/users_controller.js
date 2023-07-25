const User = require('../models/user');




// For the xhr request to check the valid email address
module.exports.checkIfUserExists = async function(req,res){
    try {
        let user = await User.findOne({email : req.params.email});
        if(user){
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        user: [user]
                    }
                });
            }
            return res.redirect('back');
        }
        else{
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        user: undefined
                    }
                });
            }
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log("Error in finding the user ",error);
        return res.redirect('back');
    }
}

module.exports.signin = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_signin');
}


module.exports.signup = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_signup');
}

module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    if(req.body.isAdmin == undefined){
        req.body.isAdmin = false;
    }
    if(req.body.isAdmin == "on"){
        req.body.isAdmin = true;
    }
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user){
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            })

            return res.redirect('/user/sign-in');
        }
        else{
            console.log("User Already exists with this email id");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Error in finding the user", err);
        return res.redirect('back');
    }
    
}

module.exports.createSession = async function(req,res){
    return res.redirect('/');
}


module.exports.showProfile = async function(req,res){

    return res.render('user_profile');
}

module.exports.destroySession = async function(req,res,next){
    req.logout(function(err){
        if(err){
            console.log("Error "+ err);
            return next(err);
        }
        return res.redirect('/');
    });
    
}


module.exports.adminView = function(req, res){

    if(req.user.isAdmin){
        return res.render('adminView',{
            users : []
        });
    }
    return res.redirect('/');
    
}