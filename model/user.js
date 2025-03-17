var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    userName: String,
    passWord: String
})
module.exports = mongoose.model('User',user)