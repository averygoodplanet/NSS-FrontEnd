
/*
 * GET /people page.
 */

//this function is call people.index
exports.index = function(req, res){
  res.render('people/index', { title: 'People: Address Book' });
  //render out people/index.jade
};