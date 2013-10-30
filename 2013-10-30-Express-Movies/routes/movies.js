var db = require('../modules/database');
var file = __dirname + '/../db/movies.json';
var Movie = require('../models/movie');
var _ = require('lodash');
/*
 * GET /movies
 */

exports.index = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){
    return new Movie(genericMovie);
  });

  res.render('movies/index', {title: 'Movies', movies: movies});
};


/*
 * DELETE /movies/Jaws aka movies/:title
 */

exports.delete = function(req, res){
  //from routes 'movies/:title';  params mean out of url.
  var title = req.params.title;
  var movies = db.read(file);
  movies = _.reject(movies, function(movie){return movie.title === title});
  db.write(file, movies);
  res.redirect('/movies');
};