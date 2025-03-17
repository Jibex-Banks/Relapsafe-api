const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contact = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phoneNumber: String,
    subject: String,
    message: String,
    date: String,
    reply:{
        replymessage:String,
        datereplied: String,
    }
});

module.exports = mongoose.model('Contact',contact);