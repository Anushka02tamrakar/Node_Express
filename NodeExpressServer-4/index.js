const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const { default: mongoose } = require('mongoose') default we get when it is not imported correctly
const dotenv = require('dotenv')
dotenv.config()


app.use(bodyParser.urlencoded());

/*mongoose.connect('mongodb+srv://anushka:anushka123@cluster0.ydlhpvx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('server is up')) //this is the 1st way to check db connceted or not but not efficient one
    .catch((error) => console.log(error))
*/
// this is how we can create collection in nodejs using mongodb 
const User = mongoose.model('User', { //mongppse is start it will covert User -> users 
  firstName: String,
  lastName: String,
  class: Number
})

app.get('/', (req, res) => {
  res.send('Server is Start')
})
//fetching the list of all user - using FIND method
//GET - read
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      status: 'SUCCESS',
      data: users
    })

  } catch (error) {
    res.status(500).json({  //res.status(500).json({}) - one way
      status: 'FAILED',    // 2nd way to write status format
      message: 'Something went wrong!'
    })
  }
})
// POST - Create
app.post('/users', async (req, res) => {
  const { firstName, lastName, classNumber } = req.body
  try {
    await User.create({
      firstName,
      lastName,
      class: classNumber
    })
    res.json({
      status: 'SUCCESS'
    })

  } catch (error) {
    res.status(500).json({  //res.status(500).json({}) - one way
      status: 'FAILED',    // 2nd way to write status format
      message: 'Something went wrong!'
    })
  }
})
// UPDATE - Patch (find by id and update method)
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, classNumber } = req.body
  try {
    await User.findByIdAndUpdate(id,{
      firstName,
      lastName,
      class: classNumber
    })
    res.json({
      status: 'SUCCESS'
    })

  } catch (error) {
    res.status(500).json({  //res.status(500).json({}) - one way
      status: 'FAILED',    // 2nd way to write status format
      message: 'Something went wrong!'
    })
  }
})
// DELETE - deleted
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  try {
    await User.findByIdAndDelete(id)
    res.json({
      status: 'SUCCESS'
    })

  } catch (error) {
    res.status(500).json({  //res.status(500).json({}) - one way
      status: 'FAILED',    // 2nd way to write status format
      message: 'Something went wrong!'
    })
  }
})
//search - this will not work with get method so better to commented on while working with others
/*app.get('/users', async (req, res) => {
  try {
    const { firstName, lastName, classNumber} = req.query
    const query = {}
    if(firstName){
      query.firstName = firstName
    }
    if(lastName){
      query.lastName = lastName
    }
    if(classNumber){
      query.class = classNumber
    }
    const users = await User.find(query)
    res.json({
      status: 'SUCCESS',
      data: users
    })

  } catch (error) {
    res.status(500).json({  //res.status(500).json({}) - one way
      status: 'FAILED',    // 2nd way to write status format
      message: 'Something went wrong!'
    })
  }
})*/


app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('server is up')) //good way to check db conncected successfully
    .catch((error) => console.log(error))

})

/*
  - Database (DB) - Permanent storage
    Two Types - 
      1. SQL - (relational db)
             - Table and Row format
             - ex- MySQL, PostgreSQL, SQLite, etc
      2. NoSQL - (Non-relational db)
               - collection and document format
               - ex- MongoDB, AWS DynamoDB, etc

  - MongoDB
  - Mongoose - nothing but mongo driver/ODM (object data modelling) or we can say a translator to connect nodejs and mongo database.
         - Mongoose model has two argument
              - user
              - schema

*/
/*
  CRUD Operations
      GET( Raad)
      POST (create)
      PUT (updating)  //patch 
      DELETE (deleting)
  E-Commerse
    - sellers 
    GET /sellers (Raad)
    POST /sellers (create)
    PUT /sellers/:id (updating)
    DELETE /sellers/:id (deleting)

      


*/