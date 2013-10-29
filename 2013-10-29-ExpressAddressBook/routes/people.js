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

exports.create = function(req, res){
  //req stands for request from browser
  //req.body.x  x comes from name attribute in form
  var name = req.body.name;
  var gender = req.body.gender;
  var age = parseInt(req.body.age);
  var color = req.body.color;

  var people = database.read(__dirname + '/../db/people.json');
  var person = {name: name, gender: gender, age: age, color:color};
  people.push(person);
  database.write(__dirname + '/../db/people.json', people)
  res.redirect('/people');
};