const User = require('../models/user');
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Make sure that the password and confirm_password match');
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
            req.flash('success','User Created successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error','User exists with this email');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Error in finding the user');
        return res.redirect('back');
    }
    
}

module.exports.searchByEmail = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.user_email});
        
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

module.exports.update = async function (req, res){
    if(req.body.isAdmin == "on"){
        req.body.isAdmin = true;
    }
    if(req.body.isAdmin == undefined){
        req.body.isAdmin = false;
    }

    try {
        let user = await User.findOne({_id : req.params.id});
        if(user){
            user.email = req.body.email;
            user.name = req.body.name;
            user.isAdmin = req.body.isAdmin;
            user.save();
            req.flash('success','User Updated successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error','User not found');
            return res.redirect('back');
        }
        
    } catch (error) {
        req.flash('error','Error in finding the user');
        return res.redirect('back');
    }
}


module.exports.delete = async function(req, res) {
    try {
        let user = await User.findOne({_id : req.params.id});
        if(user){
            await User.findByIdAndRemove({_id : req.params.id});
            req.flash('success','User deleted successfully');
            return res.redirect('/user/adminView');
        }
        else{
            req.flash('error','User not found');
            return res.redirect('/user/adminView');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('/user/adminView');
    }
}

