const express = require('express')
const ejs = require('ejs');
const app = express()

app.set('view engine', 'ejs')
//creating database locally for users details
const USERS = [
    {  
        username: 'michael',
        name: 'Michael Lawson',
        email: "michael.lawson@reqres.in",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
        likes : true,
        hobbies: ['playing footabell', 'coding']
    },
    {
        username: 'anushka',
        name: 'anushka Funke',
        email: "tobias.funke@reqres.in",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
        likes: false,
        hobbies: ['reading', 'writing', 'dancing']

    }

]

app.get('/', (req, res) => {
    res.send('Welcome')
})
app.get('/not-found', (req,res)=>{
    res.sendFile(__dirname + '/not-found.html')
})


//1. creating route for users Michael and Lindsay - this approach is not efficient
app.get('/users/michael' , (req,res)=>{
    res.sendFile(__dirname + '/michael.html')
    
})
app.get('/users/lindsay', (req, res)=>{
    res.sendFile(__dirname + '/lindsay.html')
})
//2. so do this dynamic by using TEMPLATE ENGINE
app.get('/users/michael', (req, res) => {
    res.render('user.ejs', {
        name: 'Michael Lawson',
        email: "michael.lawson@reqres.in",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
        likes : true,
        hobbies: ['playing footabell', 'coding']
    })
})
app.get('/users/tobias', (req, res)=>{
    res.render('user.ejs', {
        name: 'Tobias Funke',
        email: "tobias.funke@reqres.in",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
        likes: false,
        hobbies: ['reading', 'writing', 'dancing']
    })
})

//3. routing Params - instead of creating several routes try to access data using parameters
app.get('/users/:username', (req,res)=>{
    const { username } = req.params
    const userDetails = USERS.find((user)=> user.username===username)
    if(userDetails){
        res.render('user.ejs', userDetails)

    } else{
        res.redirect('/not-found')
    }
    

})
app.listen(3000, () => {
    console.log('server is up')
})

/* point 2 is called # Template Engine or View Engine - 
in this we can create things dynamic.
beacuse what if users are 1000+ we cant create every template manually so 
template engine come in existance.
*
*
*
so in this we need to create templates and insert data dynamic----
- EJS comes in existance - Embedded Javascript template <%= EJS %>

*/
