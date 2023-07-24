const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    review_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;