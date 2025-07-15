const db = require("../database/db");
const cloudinary = require('cloudinary').v2;

// Creating posts
exports.createPost = (req, res) => {
  const { post_title, post_desc, category } = req.body;
  const post_img = req.file?.path || null;
  const userId = req.userId;
  const insertQuery = `INSERT INTO posts (user_id,post_title,post_desc,category,post_img) VALUES (?,?,?,?,?)`;
  try {
    db.query(
      insertQuery,
      [userId, post_title, post_desc, category, post_img],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        return res.status(201).json({ message: "Posts created successfully" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Utility to extract post_img

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return `noteflux/posts/${publicId}`;
};

// Controller for updating posts

exports.updatePost = (req, res) => {
  const { post_title, post_desc, category } = req.body;
  const post_img = req.file?.path;
  const post_id = req.params.id;
  const user_id = req.userId;
  const fetchQuery = `SELECT * FROM posts WHERE post_id = ? AND user_id = ?`;
  db.query(fetchQuery, [post_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    const oldPost = result[0];
    if (post_img && oldPost.post_img) {
      const oldPublicId = getPublicIdFromUrl(oldPost.post_img);
      cloudinary.uploader.destroy(oldPublicId, (error, result) => {
        if (error) console.error("Failed to delete old image:", error);
        else console.log("Old image deleted:", result);
      });
    }

    const updatedImage = post_img || oldPost.post_img;

    const updateQuery = `
      UPDATE posts 
      SET post_title = ?, post_desc = ?, category = ?, post_img = ? 
      WHERE post_id = ? AND user_id = ?
    `;

    db.query(
      updateQuery,
      [post_title, post_desc, category, updatedImage, post_id, user_id],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: "Post updated successfully" });
      }
    );
  });
};

// Controller for deleting post

exports.deletePost = (req,res)=>{
    const post_id = req.params.id
    const user_id = req.userId

    const fetchQuery = `SELECT * FROM posts WHERE post_id = ? AND user_id = ?`
    db.query(fetchQuery,[post_id,user_id],(err,result1)=>{
        if(err) return res.status(500).json({err:err.message})
        const oldPost = result1[0]
        if(oldPost.post_img){
            const publicPostId = getPublicIdFromUrl(oldPost.post_img)
            cloudinary.uploader.destroy(publicPostId,(err,result)=>{
                if(err) console.error("Image upload failed",err)
                else console.log("Image deleted successfully from cloudinary")
            })
        }

        const deleteQuery = `DELETE  FROM posts WHERE post_id = ? AND user_id = ?`
        db.query(deleteQuery,[post_id,user_id],(err,result)=>{
            if(err) return res.status(500).json({err : err.message})
            return res.status(200).json({message : "Post deleted successfully"})
        })
    })
}