import React from 'react';
import Post from './Post';

const Posts = (props) => {
  const postList = () => {
    return props.posts.map(post => {
      return <Post key={post._id} user={props.user} deletePost={props.deletePost} post={post} />
    });
  }

  return (
    <div>
      <h1>All Posts:</h1>
      {postList()}
    </div>
  );
}

export default Posts;