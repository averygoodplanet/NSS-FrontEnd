
/*
 * GET lists/index page.
 */

exports.index = function(req, res){
  res.render('list/index', { title: 'Saved Task' });
};

/*
 * GET lists/new page.
 */

exports.new = function(req, res){
  res.render('list/new', {title: 'New Task'})
};