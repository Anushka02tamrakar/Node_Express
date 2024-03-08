// node server using exspress
// Exspress - fast, unopinionated, minimalist web framework for Node.js

const express = require('express')
const app =  express()

app.get('/', function(req, res){
    res.send('Our first node exspress server')
})
//first API created by me-----
app.get('/api/users', (req, res) =>{
    const users = [
        {
            name: 'Anushka'
        },
        {
            name: 'Rikki'
        },
        {
            name: 'tiya'
        }
    ]
    res.send(users)
})

app.listen(5000, ()=>{
    console.log('server is up')
})

/*
O- Response Methods - 
 - send
 - sendfile



0- HTTP Methods - 
 - GET ( Read )
 - POST ( Create )
 - PUT ( Updateing )
 - DELETE ( Deleting )
*/