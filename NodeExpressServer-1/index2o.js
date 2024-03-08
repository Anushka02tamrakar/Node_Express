const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/me', (req, res) => {
  res.sendFile(__dirname + "/index.html"); //this will take data from html file or returning file from server
  //res.send('Hello World!')
})
app.get('/me', (req, res) => {
  //console.log(res)    //so in this case our server will not load because we are not actually sending any response so it will not call any request
  //res.send('Hello Me!') 
})
app.get('/you', (req, res) => {
  //console.log(req)   // samething will be when we console req it will give error in port
  //res.send('Hello you!')
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})