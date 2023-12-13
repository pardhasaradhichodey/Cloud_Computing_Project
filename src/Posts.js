import React from "react";
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
const Post = (post) => {
    return (
        <div className="card my-3">
      <div className="card-header">
        <h6 className="mb-0">{post.post.postedBy}</h6>
      </div>
      <div className="card-body">
        <h5 className="card-title">{post.post.title}</h5>
        <p className="card-text">{post.post.content}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-outline-secondary btn-sm me-2">
          <FaThumbsUp /> Like
        </button>
        <button className="btn btn-outline-secondary btn-sm me-2">
          <FaComment /> Comment
        </button>
        <button className="btn btn-outline-secondary btn-sm">
          <FaShare /> Share
        </button>
      </div>
    </div>
    );
}
export default Post;