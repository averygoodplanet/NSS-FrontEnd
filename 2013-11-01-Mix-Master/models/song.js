var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:    { type: String, required: [true, 'Name is required.'], match: [/^[a-zA-Z]+[a-zA-Z ]*$/, '{VALUE} is an invalid name; name should only include letters and spaces.']},
  duration: { type: Number, required: [true, 'Duration is required.'], min: [ 1, '{VALUE} is an invalid duration; duration must be greater than 0.']},
  genres:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  art:      String,
  filename: String,
  lyrics:   String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);
