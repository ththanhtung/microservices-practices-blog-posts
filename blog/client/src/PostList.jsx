import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await axios.get('http://posts.com/posts');
        console.log(resp.data);
        setPosts(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  // console.log(posts);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList {...post}/>
          <CommentCreate {...post}/>
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content-between">
    {renderedPosts}
  </div>;
};

export default PostList;
