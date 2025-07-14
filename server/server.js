const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send("Server running successfully on port 3000...")
})

app.listen(port,function(){
    console.log(`Listening on port ${port}`)
})

