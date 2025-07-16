const express = require('express')
const router = express.Router()
const {createPost,updatePost,deletePost,fetchAllPosts} = require('../controllers/postControl')
const verifyUser = require('../middleware/verifyUser.middleware')
const upload = require('../middleware/cloudinary.middleware')

router.post('/create',
  (req, res, next) => {
    console.log("➡️ Middleware: verifyUser");
    next();
  },
  verifyUser,
  (req, res, next) => {
    console.log("➡️ Middleware: multer upload");
    next();
  },
  upload.single('post_img'),
  (req, res, next) => {
    console.log("➡️ Middleware: controller");
    next();
  },
  createPost
);

router.put('/edit/:id',verifyUser,upload.single('post_img'),updatePost)
router.delete('/delete/:id',verifyUser,deletePost)
router.get('/',fetchAllPosts)
module.exports = router