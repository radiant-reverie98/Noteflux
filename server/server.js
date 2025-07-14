const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/user_auth')

// Defining middlewares
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute) //Middleware for authorization

app.get('/',(req,res)=>{
    res.send(`Server running successfully on port ${port}...`)
})

app.listen(port,function(){
    console.log(`Listening on port ${port}`)
})

