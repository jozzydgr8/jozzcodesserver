const jwt = require('jsonwebtoken');
const User = require('../Schema/UserSchema')

const authenticator = async(req,res,next)=>{
    const {authorization}= req.headers;
    if(!authorization){
        return res.status(404).json({error:"no token provided"})
    }
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwtSecret);
        if(!decoded){
            return res.status(400).json({error:"invalid token"})
        }
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(400).json({error:"no such user"})
        }
        if(user.admin !== true){
            return res.status(400).json({error:"access denied"})
        }
    }catch(error){
        res.status(400).json({error:error.message})
    }

    next()
}

module.exports=authenticator