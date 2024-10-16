const mongoose = require('mongoose');

const airlineschema=new mongoose.Schema({
    id:String,
    name:String,

})

module.exports=mongoose.model('airline',airlineschema);