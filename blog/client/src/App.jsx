import React from 'react'
import PostCreate from './PostCreate'
import PostList from './PostList'

const App = () => {
  return (
    <div className='container'>
      <h1>create post :&gt;</h1>
      <PostCreate/>
      <hr />
      <h1>posts</h1>
      <PostList/>
    </div>
  )
}

export default App