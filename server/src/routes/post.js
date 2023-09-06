import { Router } from "express";
import { createPost, getPost, getPosts, likePost } from "../controllers/post.js";
import { checkAuthenticated } from "../utils/checkAuthentication.js";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost)

router.post("/posts", checkAuthenticated, createPost);
router.post("/posts/:id/like", checkAuthenticated, likePost);
export default router;
