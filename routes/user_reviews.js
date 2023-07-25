const express = require('express');
const router = express.Router();
const user_reviews_controller = require('../controllers/user_reviews_controller');

router.get('/', user_reviews_controller.getReviews);












module.exports = router;