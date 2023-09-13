import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedPosts } from "../../features/posts/actions";
import Post from "./Post";

function LikedPosts() {
  const { likedPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikedPosts());
  }, [dispatch]);
  return (
    <div>
      {!likedPosts.length ? (
        <p>You don't have any liked posts</p>
      ) : (
        likedPosts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default LikedPosts;
