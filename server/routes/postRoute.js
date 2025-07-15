const express = require('express')
const router = express.Router()
const {createPost,updatePost,deletePost,fetchAllPosts} = require('../controllers/postControl')
const verifyUser = require('../middleware/verifyUser.middleware')
const upload = require('../middleware/cloudinary.middleware')

router.post('/create',verifyUser,upload.single('post_img'),createPost)
router.put('/edit/:id',verifyUser,upload.single('post_img'),updatePost)
router.delete('/delete/:id',verifyUser,deletePost)
router.get('/',fetchAllPosts)
module.exports = router