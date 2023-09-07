import { Router } from "express";
import {
  createPost,
  deletePost,
  getLikedPosts,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.js";
import { checkAuthenticated } from "../utils/checkAuthentication.js";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);

router.get("/liked-posts", checkAuthenticated, getLikedPosts)
router.post("/posts", checkAuthenticated, createPost);
router.post("/posts/:id/like", checkAuthenticated, likePost);
router.put("/posts/:id", checkAuthenticated, updatePost);
router.delete("/posts/:id", checkAuthenticated, deletePost);

export default router;
