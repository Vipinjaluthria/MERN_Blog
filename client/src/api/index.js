import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile").token
    )}`;
  }
  return req;
});
export const fetchPosts = () => API.get("/posts");
export const createPosts = (newPost) => API.post("/posts", newPost);
export const updatePosts = (currentId, post) =>
  API.patch(`/posts/${currentId}`, post);
export const deletPosts = (currentId) => API.delete(`/posts/${currentId}`);
export const likePosts = (currentId) =>
  API.patch(`/posts/${currentId}/likeposts`);
export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
