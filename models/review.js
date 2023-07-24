const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    reviewed_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_by_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    associated_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{
    timestamps: true
});

const Review = mongoose.model('Review', reviewsSchema);
module.exports = Review;