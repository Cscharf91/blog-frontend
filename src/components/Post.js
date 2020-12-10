import React from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
  const post = props.post;
  return (
    <div className="post-wrapper">
      <h3>{post.title}</h3>
      <h5>{post.user}</h5>
      <p>{post.body}</p>
      {props.user && props.user.name === post.user && <button onClick={() => props.deletePost(post)}>Delete</button>}
      {props.user && props.user.name === post.user && <Link to={`/edit/${post._id}`}>Edit</Link>}
    </div>
  );
}

export default Post;