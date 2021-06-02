const mongoose = require('mongoose')

var ToDo = mongoose.model('ToDo',
{
    todo : {type:String},
    date : {type:Date},
},'ToDo')

module.exports = { ToDo }