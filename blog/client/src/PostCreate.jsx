import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('fuck you');

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://posts.com/posts/create', { title });
      setTitle('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={createPost}>
      <div className="form-group">
        <label>title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={titleHandler}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  );
};

export default PostCreate;
