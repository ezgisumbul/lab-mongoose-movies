const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  occupation: {
    type: String,
    enum: [
      'actor',
      'musician',
      'singer',
      'comedian',
      'athlete',
      'other',
      'unknown'
    ],
    required: true
  },

  catchPhrase: {
    type: String,
    required: true,
    unique: true
  }
});

const Celebrity = new mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
