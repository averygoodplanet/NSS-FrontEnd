var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

/*
 * GET /genres
 */

exports.index = function(req, res){
  Genre.find(function(err, genres){
    res.render('genres/index', {title: 'Mix Master', genres: genres});
  });
};

/*
 * GET /genres/new
 */

exports.new = function(req, res){
  res.render('genres/new', {title: 'Mix Master'});
};

/*
 * POST /genres
 */

exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count){
    if (err){
      res.render('genres/new', {title: 'Mix Master', errors: err.errors});
    } else{
      res.redirect('/genres');
    }
  });
};

/*
 * GET /genres/:id/edit
 */

exports.edit = function(req, res){
  res.render('genres/edit', {title: 'Mix Master',})
};


/*
 * PUT /genres/:id
 */

exports.update = function(req, res){
};