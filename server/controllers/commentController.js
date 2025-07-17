const mongoose = require("mongoose");
const Comment = require("../Models/comments");

//  Create Comment
exports.createComment = async (req, res) => {
  const user_id = req.userId;
  const post_id = req.params.id;
  const { content } = req.body;

  // Validate post_id
  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const newComment = new Comment({
      userId: new mongoose.Types.ObjectId(user_id),
      postId: new mongoose.Types.ObjectId(post_id),
      content
    });

    await newComment.save();
    res.status(200).json({ message: "Comment created successfully" ,newComment});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch Comments for a Post
exports.fetchComment = async (req, res) => {
  const post_id = req.params.id;

  // Validate post_id
  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const comments = await Comment.find({ postId: post_id })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const formattedComments = comments.map((comment) => ({
      comment_id: comment._id,
      content: comment.content,
      created_at: comment.createdAt,
      user_id: comment.userId._id,
      name: comment.userId.name
    }));

    res.status(200).json({
      message: "Comments fetched successfully",
      content: formattedComments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
