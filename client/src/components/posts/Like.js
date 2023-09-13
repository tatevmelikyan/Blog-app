import React, { useEffect, useState } from "react";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Button, List, Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unLikePost } from "../../features/posts/actions";
import { useNavigate } from "react-router-dom";
import { isPostLikedByUser } from "../../utility/functions/functions";

function Like({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoginSuccess } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setIsLiked(isPostLikedByUser(post, user.id));
    }
  }, [post, user]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleLike = () => {
    if (isLoginSuccess) {
      const { id, firstName, lastName } = user;
      setIsLiked((prev) => !prev);
      if (isLiked) {
        return dispatch(unLikePost({ postId: post.id, userId: id }));
      }
      return dispatch(likePost({ postId: post.id, user: { id, firstName, lastName } }));
    }
    navigate("/login");
  };
  return (
    <Space direction="vertical">
      <Button type="text" onClick={showModal}>
        {post.likedByUsers.length}
      </Button>
      <Modal title="Liked By" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <List
          dataSource={post.likedByUsers}
          renderItem={(item) => (
            <List.Item>
              {item.firstName} {item.lastName}
            </List.Item>
          )}
        />
      </Modal>
      <Button
        type={isLiked ? "primary" : "default"}
        onClick={toggleLike}
        icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
      >
        Like
      </Button>
    </Space>
  );
}

export default Like;
