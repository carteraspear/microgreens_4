import React, { useState, useEffect, useCallback } from "react";
import Post from "./Post";
import "./Posts.css"; 

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // simulate fetching posts from an API
  const fetchPosts = useCallback(async (page: number) => {
    // todo: replace this with an actual API call
    const newPosts = Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i + 1,
      username: `User ${(page - 1) * 10 + i + 1}`,
      location: `Location ${(page - 1) * 10 + i + 1}`,
      timestamp: new Date().toLocaleString(),
      body: `This is the body of post ${(page - 1) * 10 + i + 1}.`,
    }));
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  }, []);

  // load initial posts
  useEffect(() => {
    fetchPosts(page);
  }, [fetchPosts, page]);

  // handle infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  // add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // handle comment button click
  const handleCommentClick = (postId: number) => {
    setSelectedPostId(postId);
    setShowComments(true);
  };

  // handle back button click
  const handleBackClick = () => {
    setShowComments(false);
    setSelectedPostId(null);
  };

  // render comments page
  if (showComments && selectedPostId !== null) {
    return (
      <div className="comments-page">
        <button className="back-button" onClick={handleBackClick}>
          Back to Feed
        </button>
        <h2>Comments for Post {selectedPostId}</h2>
        <div className="comments-list">
          {/* render comments here */}
          <p>Comment 1</p>
          <p>Comment 2</p>
          <p>Comment 3</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.username}
          location={post.location}
          timestamp={post.timestamp}
          body={post.body}
          onCommentClick={() => handleCommentClick(post.id)}
        />
      ))}
    </div>
  );
};

export default Posts;