var mongoose = require('mongoose');
var Game = mongoose.model('Game');

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
  // req.query is e.g. {player: "Ricky"}
  // create a new game and saves to database
  new Game(req.query).save(function(err, game){
    //this code happens when database finishes saving game to database
    res.send(game);
  });
};

/*
 * PUT /games/:id
 */

exports.complete = function(req, res){
  //find the game by id
  Game.findById(req.params.id, function (err, game) {
    game.guess = req.body.guess;
    game.didWin = game.guess == game.actual;
    game.save(function(err, updatedGame){
      res.send(updatedGame);
    });
  });
};
