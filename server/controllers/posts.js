import Mongoose from "mongoose";
import PostMessage from "../models/postmessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    // console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { _id: _id } = req.params;
  const post = req.body;
  const updatedPost = await PostMessage.findOneAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};
export const deletePosts = async (req, res) => {
  const { _id } = req.params;
  const deletePost = await PostMessage.findOneAndRemove(_id);
  res.json({ message: "Deleted succesfully" });
};
export const likePosts = async (req, res) => {
  const { id } = req.params;
  //console.log('vipin vipin')
  if (!req.userId) {
    return res.status(404).json("UnAuthenticated User");
  }

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => {
    id === String(userId);
  });
  if (index == -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
