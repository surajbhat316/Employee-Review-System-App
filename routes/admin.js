const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');


router.post('/create', adminController.create);
router.post('/searchByEmail',adminController.searchByEmail);
router.post('/update/:id', adminController.update);

module.exports = router;