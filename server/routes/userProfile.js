const express = require('express')
const router = express.Router()
const verifyUser = require('../middleware/verifyUser.middleware')
const {fetchUser,editUser} = require('../controllers/profileControl')

router.get('/fetch',verifyUser,fetchUser)
router.put('/editUser',verifyUser,editUser)

module.exports = router