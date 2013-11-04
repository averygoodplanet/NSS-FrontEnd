var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Mix Master', songs: songs});
  });
};

/*
 * GET /songs/new
 */
//getting genres so that we can list them as checkboxes on the new song page
exports.new = function(req, res){
  Genre.find(function(err, genres){
    res.render('songs/new', {title: 'Mix Master', genres: genres});
  });
};


/*
 * POST /songs
 */

exports.create = function(req, res){
  //object properly passed on new song to here (checked it in repl)
  new Song(req.body).save(function(err, genre, count){
    if (err){
      Genre.find(function(genreErr, genres){
        res.render('songs/new', {title: 'Mix Master', errors: err.errors, song: new Song(), genres: genres});
      });
    } else{
      res.redirect('/songs');
    }
  });
};

// exports.create = function(req, res){
//   new Genre(req.body).save(function(err, genre, count){
//     if (err){
//       res.render('genres/new', {title: 'Mix Master', errors: err.errors, genre: new Genre()});
//     } else{
//       res.redirect('/genres');
//     }
//   });
// };

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('songs/show', {title: song.title, song: song});
  });
};

/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err, song){
    res.redirect('/songs');
  });
};
