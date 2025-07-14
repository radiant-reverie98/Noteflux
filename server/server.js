const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send(`Server running successfully on port ${port}...`)
})

app.listen(port,function(){
    console.log(`Listening on port ${port}`)
})

