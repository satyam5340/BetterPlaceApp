const mongoose = require('mongoose');

const detailsSchema = mongoose.Schema({
    gender:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    nat:{
        type:String,
        required:true
    },
    large:{
        type:String
    }
})

const Details = mongoose.model('Details',detailsSchema);
module.exports = Details