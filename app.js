const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = 8000;
const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieParser());
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up the view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





app.use(session({
    name: 'employeeApp',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
            mongoUrl:'mongodb://127.0.0.1:27017/employee_review_system' ,
            autoRemove: 'disabled' 
    },
    function(err){
        console.log(err ||  'connect-mongo db setup ok');
    }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(PORT, function(err){
    if(err){
        console.log("Error in starting server ",err);
        return;
    }
    console.log("Server running on port number ", PORT);
});