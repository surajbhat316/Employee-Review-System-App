const User = require('../models/user');
const Review = require('../models/review');
const Comment = require('../models/comment');



// Get all the reviews for the logged in user where the user is being reviewed
module.exports.getReviews = async function(req,res){
    try {
        let reviewsAsAUser = await Review.find({reviewed_user : req.user.id})
                                                .populate('reviewed_user', 'name email')
                                                .populate('created_by_user', 'name email')
                                                .populate('associated_users', 'name email')
                                                .exec();
        let reviewAsAnAssociatedUser = await Review.find({associated_users : {
                                                                            $in:[req.user.id]
                                                                        }
                                                                    })
                                                                    .populate('reviewed_user', 'name email')
                                                                    .populate('created_by_user', 'name email')
                                                                    .populate('associated_users', 'name email')
                                                                    .exec();

        
        let reviewAsAnAdminUser = await Review.find({
            created_by_user: req.user.id
        })
        .populate('reviewed_user', 'name email')
        .populate('created_by_user', 'name email')
        .populate('associated_users', 'name email')
        .exec();   

        console.log(reviewsAsAUser);
        console.log(reviewAsAnAssociatedUser);
        console.log(reviewAsAnAdminUser);

        return res.render('reviews', {
            reviewsAsAUser : reviewsAsAUser,
            reviewAsAnAssociatedUser : reviewAsAnAssociatedUser,
            reviewAsAnAdminUser : reviewAsAnAdminUser
        });

    } catch (error) {
        return res.redirect('back');
    }
}


// Show all the details for a particular Review
module.exports.showDetails = async function(req,res){
    try {
        let review = await Review.findById(req.params.id)
                                        .populate('reviewed_user', 'name email')
                                        .populate('created_by_user', 'name email')
                                        .populate('associated_users', 'name email')
                                        .exec();;


        let comments = await Comment.find({review_id : req.params.id})
                                            .populate('user_id', 'name email');
        return res.render('review_detail',{
            review: review,
            comments: comments
        });
    } catch (error) {
        return res.redirect('back');
    }
}

// To add a new comment
module.exports.addComment = async function(req,res){
    try {
        let comment = await Comment.create({
            content: req.body.comment,
            review_id: req.params.id,
            user_id: req.user.id
        });
        req.flash('success','Comment added successfully');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        console.log(error);
        return res.redirect('back');
    }
}


// Add an associated user
module.exports.addAssociatedUser = async function(req,res){
    try {
        // console.log(req.params);
        // console.log(req.user);
        // console.log(req.body);
        let user = await User.findOne({email : req.body.email});
        // console.log(user);
        if(!user){
            req.flash('error','User not found With the requested email address');
            console.log("User not found for the given email");
            return res.redirect('back');
        }
        let review = await Review.findById(req.params.id);
        if(review){
            let associatedUsers = review.associated_users;
            if(!associatedUsers.includes(user._id)){
                associatedUsers.push(user._id);
                req.flash('success','User added to Review');
            }else{
                console.log("Enters Else");
                req.flash('error','User already present in Review');
            }
            review.associated_users = associatedUsers;
            review.save();
        }
        return res.redirect('back');
    } catch (error) {
        req.flash('error',error);
        console.log("error ",error);
        return res.redirect('back');
    }
}