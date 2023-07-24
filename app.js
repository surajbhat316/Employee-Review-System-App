const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.use(express.urlencoded());
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up the view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', require('./routes/index'));

app.listen(PORT, function(err){
    if(err){
        console.log("Error in starting server ",err);
        return;
    }
    console.log("Server running on port number ", PORT);
});