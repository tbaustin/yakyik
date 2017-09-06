var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  username: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.Mixed, default: {} },
  body: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  zone: { type: String, default: '' }
});

module.exports = mongoose.model('CommentSchema', CommentSchema);
