const express=require('express');
const router=express.Router();
import {getPosts,createPost,updatePost,deletePosts,likePosts} from "../controllers/posts.js";

router.get("/",getPosts);
router.post("/",createPost);
router.patch("/:id",updatePost);
router.delete("/:id" ,deletePosts);
router.patch("/:id/likeposts",likePosts);
export default router;