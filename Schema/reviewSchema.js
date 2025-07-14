const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    project:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('reviews', ReviewSchema)