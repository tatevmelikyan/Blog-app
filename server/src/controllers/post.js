import Post from "../models/post.js";
import { validatePostPayload } from "../utils/validator.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPost = async (req, res) => {
  try {
    await validatePostPayload(req.body);
  } catch (err) {
    return res.status(403).send(err.details);
  }

  const { title, content } = req.body;
  try {
    const newPost = await req.user.createPost({
      title,
      content,
    });
    res.status(201).json({ message: "Post successfully created!", newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const [post] = await req.user.getPosts({ where: { id } });
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const updatedPost = await post.update({ title, content });
    res.status(200).json({ message: "Post updated successfully!", updatedPost });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const [post] = await req.user.getPosts({ where: { id } });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    await post.destroy();
    res.status(200).send("Post successfully deleted!");
  } catch (err) {
    res.status(500).send(err);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (post === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    await req.user.addLikedPost(post);
    return res.status(200).json({ message: "Post successfully liked" });
  } catch (err) {
    res.status(500).send();
  }
};
