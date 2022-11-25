module.exports.home = function(req, res){
    // res.end('<h1>My express server is running and up</h1>');
    return res.render('home',{
        title:"Home"
    });
}
module.exports.practice = function(req, res){
    
    res.end('<h1>This  is the practice page</h1>');
}