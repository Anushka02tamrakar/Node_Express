const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Authentication
const isLoggedIn = (req, res, next) => {
    try {
        const jwtToken = req.headers.token
        let clientDetails/*loggedIn*/ = jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY)
        if (!clientDetails/*!loggedIn*/)
            throw new error()
        req.client = clientDetails
        next()
    } catch (error) {
        return res.json({
            message: "You're not logged in ! Please login"
        })
    }
}
//Authorization
const isAdmin = (req, res, next) => {

    if (!req.client.isAdmin)
        return res.json({
            message: "You dont have access to this page"
        })

    next()
}
const isPrime = (req, res, next) => {

    if (!req.client.isPrime)
        return res.json({
            message: "You dont have access to this page"
        })

    next()
}


app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const Client = mongoose.model('Client', {
    fullName: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    isPrime: Boolean
})

app.get('/', (req, res) => {
    res.send('Server Page')
})
//read
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find()
        res.json({
            status: 'SUCCESS',
            data: clients
        })

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

app.post('/signup', async (req, res) => {
    const { fullName, email, password, isAdmin, isPrime } = req.body
    try {
        const client = await Client.findOne({ email })
        if (client) {
            return res.json({
                status: "User with this email exists, Login!"
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        await Client.create({
            fullName,
            email,
            password: encryptedPassword,
            isAdmin,
            isPrime
        })
        res.json({
            status: 'SUCCESS'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong'
        })
    }
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const client = await Client.findOne({ email })
        if (!client) {
            return res.json({
                status: "User with this email doesn't exists"
            })
        }
        const passwordMatches = await bcrypt.compare(password, client.password)
        if (!passwordMatches)
            return res.json({
                status: 'Incorrect Credentials'
            })
        const jwToken = jwt.sign(client.toJSON(), process.env.JWT_PRIVATE_KEY, { expiresIn: 30 })

        return res.json({
            status: 'Login successful',
            jwToken
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong'
        })
    }
})
app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        res.json({
            status: 'Profile Page'
        })

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})
app.get('/admin/dashboard', isLoggedIn, isAdmin, async (req, res) => {
    try {
        res.json({
            status: 'ADMIN Dashboard Page'
        })

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})
app.get('/prime/dashboard', isLoggedIn, isPrime, async (req, res) => {
    try {
        res.json({
            status: 'Prime Dashboard Page'
        })

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('Server is Up'))
        .catch((error) => console.log(error))

})

/*
login/signup 

Authentication:
     - Who are you?
     - Checking whether the user is having an account
Authorization: 
     - what access do you have?
     - Checking what acess the user have

Encryption
     - Encrypt: original password -> encrypted password
     - Decrypt: encrypted password -> original password
*/