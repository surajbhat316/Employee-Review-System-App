const User = require('../models/user');
const Review = require('../models/review');


// Action for creating a new Review
module.exports.showReviewForm = async function(req, res) {
    return res.render('review_form');
}

// Action for creating a Review
module.exports.create = async function(req, res) {
    try {
        let user = await User.findOne({email: req.body.email});  
        if(user){
            let review = await Review.create({
                title: req.body.title,
                reviewed_user: user.id,
                created_by_user: req.user._id
            });
            req.flash('success','Review created successfully');
            return res.redirect('back');

        }else{
            req.flash('error','User not found With the requested email address');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
}