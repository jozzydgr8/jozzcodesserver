require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');

const app = express();

//middle ware
app.use(cors())
app.use(express.json());

//route middleware
app.use('/blog', require('./Routes/blogRoute'));
app.use('/reviews', require('./Routes/reviewRoute'));
app.use('/user', require('./Routes/userRoutes'))


//connect db
mongoose.connect(process.env.mongoose_uri)
.then(()=>{
    app.listen(process.env.port, ()=>{
        console.log(`server live at port ${process.env.port}`)
    })
}).catch(error=>{
    console.error(error)
})