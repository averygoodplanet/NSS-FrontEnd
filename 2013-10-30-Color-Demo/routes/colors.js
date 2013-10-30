// GET /colors

exports.index = function(req, res){
  res.render('colors/index', {title: "colors"});
};