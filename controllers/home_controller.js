module.exports.home = function(req, res){
    // res.end('<h1>My express server is running and up</h1>');
    console.log(req.cookies);
    res.cookie('user_id', 25)
    return res.render('home',{
        title:"Home"
    });
}
module.exports.practice = function(req, res){
    
    res.end('<h1>This  is the practice page</h1>');
}

// module.exports.post = function(req,res){

// }