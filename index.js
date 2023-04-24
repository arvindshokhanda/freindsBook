const express = require('express');
const cookiePareser =  require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport =  require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo')(session);
const passportgGoogle = require('./config/passport-google-oauth2-strategy'); 
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true, 
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded());
app.use(cookiePareser());
//use ejs-layout
const expressLayout = require('express-ejs-layouts');
const { Session } = require('express-session');
app.use(expressLayout);

//using assets
app.use(express.static('./assets'))

//make the upload path available to the browser

app.use('/uploads', express.static(__dirname + '/uploads'));

//extract styles and files from sub pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)

//use express router

//set up the view enjine
app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to store the session key
app.use(session({
    name: 'Freindsbook',
    //TODO Change the secret before deployement in production
    secret: 'Something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 *100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
            console.log(err, 'connect mongo-dd Setup ok')
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running in the server: ${err} `);
    }
    console.log(`Server is running on Port: ${port}`);
}

)