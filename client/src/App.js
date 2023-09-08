import React from 'react'
import { Space, Typography } from 'antd';
import Posts from './features/posts/Posts';

function App() {
  
  return (
    <div>
      <Typography.Title>Blog</Typography.Title>
      <Posts/>
    </div>
  )
}

export default App