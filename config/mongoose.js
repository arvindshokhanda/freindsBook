const mongoose =  require('mongoose');
mongoose.connect('mongodb://localhost/FriendsBook_development');
const db  = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('successfully Connected to Database');
})
module.exports = db;