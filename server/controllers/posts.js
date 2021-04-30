import  Mongoose from "mongoose";
import PostMessage from "../models/postmessage";


export const  getPosts = async  (req, res) =>{
    try {
        const postMessage=await PostMessage.find();
       // console.log(postMessage);
        res.status(200).json(postMessage);
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const createPost=async (req,res)=>{
    const body=req.body;
    console.log(body);
    const newPost = new PostMessage(body);
    try {
       await newPost.save();
       res.status(201).json(newPost);
        
    } catch (error) {
        res.status(409).json({message:error.message});
        
    }
}
export const updatePost=async (req,res)=>{
    const {_id:_id}=req.params;
        const post=req.body;
        const updatedPost=await  PostMessage.findOneAndUpdate(_id,post,{new :true});
        res.json(updatedPost);

}
export const deletePosts =async(req,res)=>{
    const {_id} =req.params;
    const deletePost=await PostMessage.findOneAndRemove(_id);
    res.json({message: "Deleted succesfully"})
}
export const likePosts= async (req,res)=>{
    const { id }=req.params;
    //console.log('vipin vipin')
    const post=await PostMessage.findById(id);
    const updatedPost =await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount+1},{new :true});
    res.json(updatedPost);

}