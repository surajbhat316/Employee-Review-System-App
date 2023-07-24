const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');


router.post('/create', adminController.create);


module.exports = router;