const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');



router.use('/admin', require('./admin'));

// To Check if the email of the user is valid
router.get('/checkEmail/:email',usersController.checkIfUserExists);

router.get('/sign-in', usersController.signin);
router.get('/sign-up', usersController.signup);
router.get('/sign-out', usersController.destroySession);

router.post('/create', usersController.create);
// Use passport as a middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
), usersController.createSession);

router.get('/profile',passport.checkAuthentication ,usersController.showProfile);

router.get('/adminView',passport.checkAuthentication ,usersController.adminView);




module.exports = router;