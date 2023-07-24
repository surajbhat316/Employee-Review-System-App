const express = require('express');
const router = express.Router();



router.get('/', function(req,res){
    return res.render('home',{
        data: "Hello"
    })
});






module.exports = router;