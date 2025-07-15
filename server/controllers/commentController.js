const db = require('../database/db')

// Creating comments
exports.createComment = (req,res) =>{
    const user_id = req.userId
    const post_id = req.params.id
    const {content} = req.body

    const createQuery = `INSERT INTO comments (user_id,post_id,content) VALUES(?,?,?)`
    db.query(createQuery,[user_id,post_id,content],(err,result)=>{
        if(err) return res.status(500).json({error : err.message})
        return res.status(200).json({message : "Comment created successfully"})
    })
}

// Displaying comments

exports.fetchComment = (req,res) => {
    const post_id = req.params.id

    const fetchQuery = `SELECT c.comment_id,c.content,c.created_at,c.user_id,u.name 
    FROM comments c
    JOIN users u ON c.user_id = u.user_id
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC`
    db.query(fetchQuery,[post_id],(err,result)=>{
        if(err) return res.status(500).json({message : err.message})
        res.status(200).json({message : "Comments fetched successfully",content : result})
    })

}