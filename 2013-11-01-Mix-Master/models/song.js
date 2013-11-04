var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:    { type: String, required: [true, 'Name is required.'], match: [/^[a-zA-Z]+[a-zA-Z ]*$/, '{VALUE} is an invalid name; name should only include letters and spaces.']},
  duration: { type: Number, required: [true, 'Duration is required.'], min: [ 1, '{VALUE} is an invalid duration; duration must be greater than 0.']},
  genres:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  art:      { type: String, required: [true, 'Song Image is required.'], match: [/\.(jpg|png|gif)$/, 'Song image must end in .jpg, .png, .gif, or .bmp']},
  filename: { type: String, required: [true, 'Filename is required.'], match: [/\.(mp3|ogg|wav)$/, 'Filename must end in .mp3, .ogg, or .wav']},
  lyrics:   String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);
