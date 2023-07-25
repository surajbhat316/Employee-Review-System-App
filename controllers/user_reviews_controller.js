const User = require('../models/user');
const Review = require('../models/review');



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