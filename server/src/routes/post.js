import { Router } from "express";
import {
  createPost,
  deletePost,
  getLikedPosts,
  getPostDetails,
  getAllPosts,
  likePost,
  unlikePost,
  updatePost,
  getUserPosts,
} from "../controllers/post.js";
import { checkAuthenticated } from "../utils/checkAuthentication.js";

const router = Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostDetails);

router.get("/user/posts", checkAuthenticated, getUserPosts);
router.get("/liked-posts", checkAuthenticated, getLikedPosts);
router.post("/posts", checkAuthenticated, createPost);
router.post("/posts/:id/like", checkAuthenticated, likePost);
router.delete("/posts/:id/unlike", checkAuthenticated, unlikePost);
router.put("/posts/:id", checkAuthenticated, updatePost);
router.delete("/posts/:id", checkAuthenticated, deletePost);

export default router;
