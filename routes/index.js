const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');



router.use('/user', require('./user'));
router.use('/reviews', require('./user_reviews'));

router.get('/', homeController.displayHomePage);






module.exports = router;