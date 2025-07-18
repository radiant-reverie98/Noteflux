import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function PostDesc() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`https://noteflux.onrender.com/api/posts/${id}`);
        setPost(res.data.post || {});
      } catch (err) {
        console.error("Failed to load post:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://noteflux.onrender.com/api/comment/fetch/${id}`);
        setComments(res.data.content || []);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };

    fetchPostDetails();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to leave a comment.");
      return;
    }

    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      await axios.post(
        `https://noteflux.onrender.com/api/comment/create/${id}`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText(""); // Clear input
      // Fetch updated comments
      const res = await axios.get(`https://noteflux.onrender.com/api/comment/fetch/${id}`);
      console.log(token)
      setComments(res.data.content || []);
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Something went wrong while posting the comment.");
    }
  };

  if (!post) return null;

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Navbar />

      <main className="w-full min-h-screen bg-black text-white px-4 md:px-6 py-20 flex flex-col items-center md:items-start justify-start space-y-16">
        {/* Post Image */}
        <div className="w-full flex justify-center">
          <img
            src={post.post_img}
            className="w-full max-w-xs sm:max-w-sm md:max-w-[960px] md:h-[600px] rounded-lg object-cover"
            alt={post.post_title}
          />
        </div>

        {/* Post Description */}
        <div className="w-full md:max-w-3xl md:px-30">
          <h2 className="text-lg font-bold mb-4">
            By {post.author_name} - {formattedDate}
          </h2>
          <p className="text-[#999999] leading-snug">{post.post_desc}</p>
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="w-full md:max-w-3xl md:px-30 flex flex-col gap-4"
        >
          <label htmlFor="comment" className="text-sm text-[#898989]">
            Leave a comment
          </label>
          <textarea
            id="comment"
            rows="4"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="self-start bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Post Comment
          </button>
        </form>

        {/* Comments Section */}
        <div className="w-full md:max-w-3xl md:px-30 flex flex-col gap-4">
          <h3 className="text-xl text-white font-bold">Recent Comments</h3>
          <div className="text-sm text-[#898989] font-semibold leading-relaxed space-y-3">
            {comments.map((comment, index) => {
              const commentDate = new Date(comment.created_at).toLocaleString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <p key={index}>
                  <span className="font-semibold text-white">{comment.name}</span> · {commentDate} – {comment.content}
                </p>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default PostDesc;
