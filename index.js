const express = require('express');
const cookiePareser =  require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookiePareser());
//use ejs-layout
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);

//using assets
app.use(express.static('./assets'))

//extract styles and files from sub pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)

//use express router
app.use('/', require('./routes'));
//set up the view enjine
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running in the server: ${err} `);
    }
    console.log(`Server is running on Port: ${port}`);
}

)