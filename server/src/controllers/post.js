import Post from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await req.user.createPost({
      title,
      content,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json("Failed to create post");
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
