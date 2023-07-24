const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');


router.post('/create', adminController.create);
router.post('/searchByEmail',adminController.searchByEmail);

module.exports = router;