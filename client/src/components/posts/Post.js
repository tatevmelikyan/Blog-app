import { Card } from "antd";
import React from "react";
import Like from "./Like";
import Title from "antd/es/skeleton/Title";
import Meta from "antd/es/card/Meta";
import {UserOutlined} from '@ant-design/icons';

function Post({ post }) {
  const createdAt = new Date(post.createdAt)
  return (
    <Card
      key={post.id}
      title={<div><UserOutlined /> {post.user.firstName} {post.user.lastName}</div>}
      actions={[<Like post={post} />]}
      style={{ minWidth: "500px", maxWidth: "1000px" }}
    >
      <Meta  title={post.title}
      description={createdAt.toLocaleString()}
      />
      <p>{post.content}</p>
    </Card>
  );
}

export default Post;
