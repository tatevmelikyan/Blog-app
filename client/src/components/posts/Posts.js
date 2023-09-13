import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Spin } from "antd";
import { getAllPosts } from "../../features/posts/actions";
import Post from "./Post";

function Posts() {
  const { posts, isGetAllPostsRequest, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      <Space direction="vertical">
      {isGetAllPostsRequest ? <Spin /> : posts.map((post) => <Post key={post.id} post={post} />)}
    </Space>
    </div>
  );
}

export default Posts;
