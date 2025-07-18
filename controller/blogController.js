const Blog = require('../Schema/blogSchema');
const mongoose = require('mongoose')
const getAllBlogs = async(req,res)=>{
    try{
        const blog = await Blog.find({});
        res.status(200).json(blog);
    }catch(error){
        res.status(400).json({error:error})
    }
}
const createBlog = async(req,res)=>{
    const {description, title, slug, sections} = req.body
    try{
        const blog = await Blog.create({title:title, description:description, slug:slug, sections:sections});
        res.status(200).json(blog)
    }catch(error){
        console.log(error.message,'error.message')
        res.status(400).json({error:error})
    }
} 

const updateBlog = async(req, res)=>{
    const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid request'})
    }
    try{
        const blog = await Blog.findOneAndUpdate({_id:id},req.body, {new:true});
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error:error})
    }
}

const deleteBlog = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid request'})
    }
    try{
        const blog = await Blog.findOneAndDelete({_id:id}, {new:true});
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error:error})
    }
}

module.exports={
    getAllBlogs, createBlog, updateBlog, deleteBlog
}