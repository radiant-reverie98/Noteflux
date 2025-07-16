const express = require('express')
const router = express.Router()
const {createComment,fetchComment} = require('../controllers/commentController')
const verifyUser = require('../middleware/verifyUser.middleware')

router.post('/create/:id',verifyUser,createComment)
router.get('/fetch/:id',fetchComment)

module.exports = router