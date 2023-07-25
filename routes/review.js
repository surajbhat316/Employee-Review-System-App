const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review_controller');

router.get('/', reviewController.showReviewForm);
router.post('/create', reviewController.create);


module.exports = router;