const express = require('express');
const router = express.Router();
const user_reviews_controller = require('../controllers/user_reviews_controller');

router.get('/', user_reviews_controller.getReviews);

router.get('/detail/:id', user_reviews_controller.showDetails);
router.post('/detail/:id/addComment', user_reviews_controller.addComment);










module.exports = router;