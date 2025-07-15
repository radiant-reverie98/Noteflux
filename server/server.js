const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/user_auth')
const userProfile = require('./routes/userProfile')
const postRoute = require('./routes/postRoute')

// Defining middlewares
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute) //Middleware for authorization
app.use('/api/profile',userProfile) //Middleware for user profile
app.use('/api/posts',postRoute) //Middleware for posts

app.get('/',(req,res)=>{
    res.send(`Server running successfully on port ${port}...`)
})

app.listen(port,function(){
    console.log(`Listening on port ${port}`)
})

