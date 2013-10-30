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

exports.new = function(req, res){
  res.render('movies/new');
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

exports.create = function(req, res){
  var newMovie = {};
  newMovie.title = req.body.title;
  newMovie.image = req.body.image;
  newMovie.color = req.body.color;
  newMovie.rated = req.body.rated;
  newMovie.studio = req.body.studio;
  newMovie.gross = req.body.gross;
  newMovie.numTheatres = req.body.numTheatres;

  //read current file
  var movies = db.read(file);
  //add new movie
  movies.push(newMovie);
  //save movie
  db.write(file, movies);
  res.redirect('/movies');
};