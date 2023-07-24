const mongoose = require('mongoose');
const pointsSchema = new mongoose.Schema({

    review_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true
    },
    review_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    point_proovider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    points:{
        type: Number,
        required: true
    }
});


const Point = mongoose.model("Point", pointsSchema);
module.exports = Point;