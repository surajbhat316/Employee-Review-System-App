const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/employee_review_system');

const db = mongoose.connection;

db.on('error',console.error.bind(console, "Error connecting to db"));

db.once('open', function(){
    console.log("Connected to database");
})

module.exports = db;