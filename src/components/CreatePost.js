import React from 'react';

const CreatePost = (props) => {
  return (
    <form onSubmit={props.handlePostSubmit} className="post-form">
      <br/><label>Title:</label>
      <input type="text" name="title" value={props.newPost.title} onChange={props.onChangePost} /><br/><br/>
      <label>Body:</label>
      <textarea name="body" value={props.newPost.body} onChange={props.onChangePost} /><br/><br/>
      <button>Submit Post</button>
    </form>
  );
}

export default CreatePost;