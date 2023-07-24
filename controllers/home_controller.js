module.exports.displayHomePage = function(req, res){
        return res.render('home',{
        data: "Hello"
    });
}