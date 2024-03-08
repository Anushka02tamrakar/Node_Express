const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  avatar: String
})
app.get('/', (req, res) => {
  res.send('Server Page')
})
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      status: 'SUCCESS',
      data: users
    })

  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong!'
    })
  }
})
app.post('/users', async (req,res)=>{
  const {firstName, lastName, email, avatar} = req.body
  try{
    await User.create({
      firstName,
      lastName,
      email,
      avatar
    })
    res.json({
      status:'SUCCESS'
    })

  } catch (error){
    res.status(500).json({
      status:'FAILED',
      message: 'Something went wrong'
    })
  }
})

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Server is Up'))
    .catch((error) => console.log(error))

})

/*
CORS error - when we run website on diff port and we try 
to add those diff port so in this case we face this error 
so in order to remove this error we need to use CORS to connect
those different ports.
so 1. install cors using npm install cors
   2. use cors as a middleware so use app.use(cors())
*/