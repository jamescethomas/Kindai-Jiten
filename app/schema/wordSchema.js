var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
  wordId: Number,
  reading: String, // Phonetic guide in hiragana
  dateAdded: Date,
  userid: Number,
  word: String,
  definition: String,
  examples: Array,
  likeData: Object,
  commentData: Object
});

module.exports = wordSchema;
