var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var story = new Schema({
    content: String
});

module.exports = mongoose.model('Story',story);