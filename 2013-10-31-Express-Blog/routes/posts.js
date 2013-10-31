/*
 * GET /posts
 */

exports.index = function(req, res){
  res.render('posts/index');
};

/*
 * GET /posts/new
 */

exports.new = function(req, res){
  res.render('posts/new');
};

/*
 * POST /posts
 */

exports.create = function(req, res){
  res.redirect('/posts');
};

/*
 * GET /posts/:id/edit
 */

exports.edit = function(req, res){
  res.render('posts/edit');
};

/*
 * PUT /posts/:id
 */

exports.update = function(req, res){
  res.redirect('/posts' + req.params.id);
};

/*
 * GET /posts/:id
 */

exports.show = function(req, res){
  res.render('posts/show');
};

/*
 * DELETE /posts/:id
 */

exports.delete = function(req, res){
  res.redirect('/posts');
};