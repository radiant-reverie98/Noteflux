const express = require('express')
const router = express.Router()
const {createPost} = require('../controllers/postControl')
const verifyUser = require('../middleware/verifyUser.middleware')
const upload = require('../middleware/cloudinary.middleware')

router.post('/create',verifyUser,upload.single('post_img'),createPost)

module.exports = router