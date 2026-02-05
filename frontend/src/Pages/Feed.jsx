import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/feed.css"

export default function Feed() {

  // Store the list of posts 
  const [posts, setPosts] = useState([]);

  // Store the input value for the new post text
  const [text, setText] = useState("");

  // Store the input value for the new post image URL
  const [image, setImage] = useState("");
  
  // navigation (redirection)
  const navigate = useNavigate();

  // All posts from the server
  const loadPosts = async () => {
    try {
      // request to the backend
      const res = await api.get("/api/post");
      // Update the local state 
      setPosts(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load posts");
    }
  };

  // useEffect runs once when the component mounts (loads)
  useEffect(() => {
    const fetchPosts = async () => {
      await loadPosts();
    };
    fetchPosts();
  }, []); // Empty dependency array [] ensures this runs only once

  // create a new post
  const createPost = async (e) => {
    e.preventDefault(); // reloading form submit

    try {
      await api.post("/api/post", {
        text,
        image,
      });

      // Clear the input fields after successful creation
      setText("");
      setImage("");
      // Refresh the feed to show the new post
      loadPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Create post failed");
    }
  };

  // liking a specific post
  const likePost = async (id) => {
    try {
      // like endpoint using the post ID
      await api.post(`/api/post/${id}/like`);
      // update like count
      loadPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Like failed");
    }
  };

  // adding a comment
  const addComment = async (id) => {

    const commentText = prompt("Enter comment");

    if (!commentText) return;

    try {
      // Send the comment to the backend
      await api.post(`/api/post/${id}/comment`, {
        text: commentText,
      });
      // show the new comment count
      loadPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Comment failed");
    }
  };

  return (
    <div className="feed-wrapper">
      <div className="feed-header">
        <h2>Feedbook</h2>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <form className="create-post" onSubmit={createPost}>
        <input
          placeholder="Post text"
          value={text}
          onChange={(e) => setText(e.target.value)} // Update state on typing
        />

        <br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update state on typing
        />

        <br />

        <button>Create Post</button>
      </form>

      <hr />

      {/* List of Posts */}
      {posts.map((p) => (
        <div className="post-card" key={p._id}>
          {/* Display Username (fallback to "Unknown" if missing) */}
          <b className="post-user">{p.user?.username || "Unknown user"}</b>

          <p className="post-text">{p.text}</p>

          {/* Conditionally render image if one exists */}
          {p.image && (
            <img className="post-image" src={p.image} alt="" width="200" />
          )}

          {/* Post Interactions */}
          <div className="post-footer">
            <p>Likes: {p.likes?.length || 0}</p>
            <p>Comments: {p.comments?.length || 0}</p>

            <button onClick={() => likePost(p._id)}>Like</button>

            <button onClick={() => addComment(p._id)}>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}