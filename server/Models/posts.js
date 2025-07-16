const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type:  mongoose.Schema.Types.ObjectId, ref: "User" },
  postTitle: String,
  postDesc: String,
  post_img: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
