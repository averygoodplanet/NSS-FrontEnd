var mongoose = require('mongoose');

var Genre = mongoose.Schema({
  name:      { type: String, match: /^[a-zA-Z]+[a-zA-Z ]$/},
  songs:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Genre', Genre);
