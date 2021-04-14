import axios from "axios";

const url="http://localhost:5000/posts"
export const fetchPosts=()=>axios.get(url);
export const createPosts=(newPost)=>axios.post(url,newPost);
export const updatePosts=(currentId,post)=>axios.patch(`${url}/${currentId}`,post);
export const deletPosts=(currentId)=>axios.delete(`${url}/${currentId}`);
export const likePosts=(currentId) =>axios.patch(`${url}/${currentId}/likeposts`);

