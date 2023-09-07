import Post from "../models/post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPostDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await req.user.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const likedPosts = await req.user.getLikedPosts();
    res.status(200).json(likedPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { validatedPayload } = req;
    const newPost = await req.user.createPost(validatedPayload);
    res.status(201).json({ message: "Post successfully created!", newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { validatedPayload } = req;
  const { id } = req.params;
  try {
    const [post] = await req.user.getPosts({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedPost = await post.update(validatedPayload);
    res.status(200).json({ message: "Post updated successfully!", post: updatedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await req.user.getPosts({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post successfully deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await req.user.addLikedPost(post);
    return res.status(200).json({ message: "Post successfully liked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    const isPostLiked = await req.user.hasLikedPost(post);
    if (!post || !isPostLiked) {
      return res.status(404).json({ message: "Post not found or it is not liked" });
    }
    await req.user.removeLikedPost(post);
    return res.status(200).json({ message: "Like successfully removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
