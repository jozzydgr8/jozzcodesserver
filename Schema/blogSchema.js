const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[5, 'title must be atleast 5 characters'],
        maxLength:[60, 'title cannot be more than 60 characters']
    },
    description:{
        type:String,
        required:true,
        minLength:[20,'description must be atleast 20 charcacters'],
        maxLength:[500, 'description must not be more than 20 characters'],
        trim:true
    },
    author:{
        type:String,
        default:"jozzycodes"
    }
}, {timestamps:true})

module.exports = mongoose.model('blog',blogSchema )