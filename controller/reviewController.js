const mongoose = require('mongoose');
const Review = require('../Schema/reviewSchema');

const getReviews = async(req,res)=>{
    try{
        const reviews = await Review.find({});
        res.status(200).json(reviews)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
const createReviews = async(req,res)=>{
    const {review, name, project} = req.body
    try{
        const reviews = await Review.create({review, name, project});
        res.status(200).json(reviews)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const updateReviews = async(req,res)=>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid Request'})
    }
    try{
        const reviews = await Review.findOneAndUpdate({_id:id}, req.body,{new:true});
        res.status(200).json(reviews)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteReviews =  async(req,res)=>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid Request'})
    }
    try{
        const reviews = await Review.findOneAndDelete({_id:id},{new:true});
        res.status(200).json(reviews)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports= {
    getReviews, createReviews, updateReviews, deleteReviews
}