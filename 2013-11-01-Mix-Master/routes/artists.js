var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

/*
 * GET /artists
 */

exports.index = function(req, res){
  //use .find to return Artists documents on callback
  Artist.find(function(err, artists){
    res.render('artists/index', {title: 'Mix Master', artists: artists});
  });
};

/*
 * GET /artists/:id
 */
exports.show = function(req, res){
  Artist.findById(req.params.id).populate('songs').exec(function (err, artist){
    console.log(artist.songs);
    res.render('artists/show', {title: artist.name, artist: artist});
  });
  // Artist.findById(req.params.id, function(err, artist){
  //   console.log(artist.songs);
  //   res.render('artists/show', {title: artist.name, artist: artist});
  // });
};

/*
 * GET /artists/new
 */

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'Mix Master', songs: songs});
  });
};

/*
 * POST /artists
 */

exports.create = function(req, res){
  console.log('--before--');
  console.log(req.body);

  new Artist(req.body).save(function(err, artist, count){
    console.log('--after--');
    console.log(artist);
    res.redirect('/artists');
  });
};

/*
 * DELETE /artists/:id
 */

exports.delete = function(req, res){
  Artist.findByIdAndRemove(req.params.id, function(err, artist){
    res.redirect('/artists');
  });
};