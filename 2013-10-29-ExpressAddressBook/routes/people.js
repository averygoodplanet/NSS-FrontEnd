var database = require('../modules/database');
// database has two exported methods, read and write.


/*
 * GET /people page.
 */

//this function is call people.index
exports.index = function(req, res){
  var people = database.read(__dirname + '/../db/people.json');
  res.render('people/index', { title: 'People: Address Book', people: people });
  //render out people/index.jade
};

//GET /people/new

exports.new = function(req, res){
  res.render('people/new', { title: 'New: Address Book' });
};