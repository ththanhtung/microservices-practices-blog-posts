import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ id }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e)=>{
    e.preventDefault()
    try {
        await axios.post(`http://posts.com/posts/${id}/comments`, {
            content
        });
        setContent('')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="comment-create">new comment</label>
        <input
          id="comment-create"
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">submit</button>
    </form>
  );
};

export default CommentCreate;
