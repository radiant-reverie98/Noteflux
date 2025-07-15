const db = require('../database/db')

// Creating posts
createPost.exports = (req,res) =>{
    const {post_title,post_desc} = req.body
    const post_img = req.file?.path || null
    const userId = req.userId
    const insertQuery = `INSERT INTO posts (user_id,post_title,post_desc,post_img) VALUES (?,?,?,?)`
    try{
        db.query(insertQuery,[userId,post_title,post_desc,post_img],(err,res)=>{
        if(err) return res.status(500).json({message : err.message})
        return res.status(201).json({message : "Posts created successfully"})
        })
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}