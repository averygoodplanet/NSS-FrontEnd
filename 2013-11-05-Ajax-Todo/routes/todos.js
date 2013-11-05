var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');

/*
 * GET /todos
 */

exports.index = function(req, res){
  Priority.find(function(err, priorities){
    res.render('todos/index', {title: 'Express', priorities: priorities});
  });
};

/*
 * POST /todos
 */

exports.create = function(req, res){
  //save new Todo object to mongodb via mongoose
  new Todo(req.body).save(function(err, todo ,count){
    //find the todo and then populating priority objects within the Todo
    Todo.findById(todo.id).populate('priority').exec(function(err, todo){
      //sending data back to the browser
      res.send(todo);
    });
  });
};