const Post = require("../Models/posts");
const User = require("../Models/users");
const cloudinary = require("cloudinary").v2;

// Utility to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return `noteflux/posts/${publicId}`;
};

// Fetch All Posts
exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map((p) => ({
      post_id: p._id,
      post_title: p.postTitle,
      post_img: p.post_img,
      created_at: p.createdAt,
      author_name: p.userId.name,
    }));

    res.status(200).json({ posts: formattedPosts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create New Post
exports.createPost = async (req, res) => {
  const { post_title, post_desc, category } = req.body;
  const post_img = req.file?.path || null;
  const userId = req.userId;

  try {
    const newPost = new Post({
      userId,
      postTitle: post_title,
      postDesc: post_desc,
      category,
      post_img: post_img,
    });

    await newPost.save();
    res.status(201).json({newPost});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  const { post_title, post_desc, category } = req.body;
  const post_img = req.file?.path || null;
  const post_id = req.params.id;
  const user_id = req.userId;

  try {
    const oldPost = await Post.findOne({ _id: post_id, userId: user_id });
    if (!oldPost) return res.status(404).json({ message: "Post not found" });

    if (post_img && oldPost.post_img) {
      const publicId = getPublicIdFromUrl(oldPost.post_img);
      await cloudinary.uploader.destroy(publicId);
    }

    oldPost.postTitle = post_title;
    oldPost.postDesc = post_desc;
    oldPost.category = category;
    oldPost.post_img = post_img || oldPost.post_img;

    await oldPost.save();
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.userId;

  try {
    const post = await Post.findOne({ _id: post_id, userId: user_id });
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.post_img) {
      const publicId = getPublicIdFromUrl(post.post_img);
      await cloudinary.uploader.destroy(publicId);
    }

    await Post.deleteOne({ _id: post_id, userId: user_id });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
