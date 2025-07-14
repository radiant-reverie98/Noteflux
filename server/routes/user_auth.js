const express = require('express')
const db = require('../database/db')
const router = express.Router()
const {register,login,logout} = require('../controllers/authControl')

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

module.exports = router