const User = require('../models/user');
const Review = require('../models/review');
const Comment = require('../models/comment');



// Get all the reviews for the logged in user where the user is being reviewed
module.exports.getReviews = async function(req,res){
    try {
        console.log(req.user.id);
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

module.exports.addComment = async function(req,res){
    try {
        let comment = await Comment.create({
            content: req.body.comment,
            review_id: req.params.id,
            user_id: req.user.id
        });
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}