const express = require('express')

const app = express()

const books = ["Book of ice & fire", "Atomic Habits", "Conversations with friends", "Normal People", "Psychology of money"]

app.get('/',(req,res)=>{
    res.send('Api Versioning')
})

// uri versioning

app.get('/v1/book/all',(req,res)=>{
    res.status(200).json({"version":"v1","books":books})
})

app.get('/v2/books', (req,res)=>{
    res.status(200).json({"version":"v2","books":books})
})

// /book/all ? v=v1/v2-> query param
app.get('/book/all',(req,res)=>{
    const version = req.query['v']
    if(version === "v2"){
        res.status(200).json({"version":"v2","books":books})
    }
    else{
        res.status(200).json({"version":"v1","books":books})
    }
})

// header-based versioning

app.get('/books', (req,res)=>{
    const {apiver} = req.headers
    if(apiver === "v2"){
        res.status(200).json({"version":"v2","books":books})
    }
    else{
        res.status(200).json({"version":"v1","books":books})
    }
})

app.listen(3000,()=>{console.log('server running on port 3000')})