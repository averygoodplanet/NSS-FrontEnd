
/*
 * GET /movies
 */

exports.index = function(req, res){
  res.render('movies/index', {title: 'Movies'});
};
