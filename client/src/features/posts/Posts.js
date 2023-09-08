import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from './postsSlice' 

function Posts() {
    const {posts, loading, error} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getAllPosts())
    }, [])
    console.log('posts::', posts);
    console.log('loading::', loading);
    console.log('error::', error);

  return (
    <div>
     posts
        </div>
  )
}

export default Posts