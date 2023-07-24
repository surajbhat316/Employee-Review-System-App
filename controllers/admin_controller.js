const User = require('../models/user');
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

            return res.redirect('back');
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

module.exports.searchByEmail = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.email});
        
        if(user){
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        users: [user]
                    }
                });
            }
            return res.render('adminView', {
                users : [user]
            });
        }
        else{
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        users: []
                    }
                });
            }
            return res.redirect('back');
        }
    } catch (error) {
        return res.redirect('back');
    }
}