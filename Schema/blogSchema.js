const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        // minLength:[5, 'title must be atleast 5 characters'],
        // maxLength:[60, 'title cannot be more than 60 characters']
    },
    description:{
        type:String,
        required:true,
        // minLength:[200,'description must be atleast 200 charcacters'],
        // maxLength:[1000, 'description must not be more than 1000 characters'],
        trim:true
    },
    author:{
        type:String,
        default:"jozzycodes"
    },
    slug:{
        type:String,
        required:true
    },
    sections: [{
    subject: { type: String, required: true },
    features: { type: [String], required: true }
  }]

}, {timestamps:true})

module.exports = mongoose.model('blog',blogSchema )