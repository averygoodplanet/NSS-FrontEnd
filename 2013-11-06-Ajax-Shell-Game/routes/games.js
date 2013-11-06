
/*
 * GET /
 */

exports.index = function(req, res){
  res.render('games/index', {title: 'Express'});
};


/*
 * GET /games/start
 */

exports.create = function(req, res){
  res.send({player: req.query.player});
};