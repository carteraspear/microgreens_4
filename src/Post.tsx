import React from "react";
import "./Posts.css"; // Import CSS for styling

interface PostProps {
  username: string;
  location: string;
  timestamp: string;
  body: string;
  onCommentClick: () => void;
}

const Post: React.FC<PostProps> = ({
  username,
  location,
  timestamp,
  body,
  onCommentClick,
}) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="username">{username}</span>
        <span className="location">{location}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="post-body">{body}</div>
      <div className="post-actions">
        <button className="action-button">Like</button>
        <button className="action-button" onClick={onCommentClick}>
          Comment
        </button>
        <button className="action-button">Share</button>
        <button className="action-button">Chat</button>
      </div>
    </div>
  );
};

export default Post;