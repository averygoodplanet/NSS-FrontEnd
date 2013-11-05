var mongoose = require('mongoose');

var ToDo = mongoose.Schema({
  title      :      String,
  dueDate    :      Date,
  priority   :      {type: mongoose.Schema.Types.ObjectId, ref: 'Priority'},
  createdAt  : {type: Date, default: Date.now}
});

mongoose.model('ToDo', ToDo);