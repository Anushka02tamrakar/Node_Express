const express = require('express')
const app =  express()
var bodyParser = require('body-parser')

//creating our own middleware
const isLoggedIn = (req, res, next)=>{
    let loggedIn = false //if this true then it will run all route, if this is false the it will print message. // explanation purpose
    if(loggedIn){
        next()
    } else{
        res.json({
            message: "You've not logged in! Please login"
        })
    }
}
//attaching middleware to the application
//.use() applies middleware to all route
app.use(bodyParser.urlencoded()) //bodyparser.urlencoded is responsible to give acurate data
//app.use(isLoggedIn)

app.get('/',(req, res)=>{
    res.send('Our first node exspress server')
})
//private route, this is how we cana add middleware but while adding priavte middleware remove app.use() it is for all route middleware 
app.get('/register', isLoggedIn, (req, res)=>{
    res.sendFile(__dirname + '/register.html')
})
//rendering register form 
app.get('/register', (req, res)=>{
    res.sendFile(__dirname + '/register.html')
})
app.get('/register/success', (req,res)=>{
    res.send('You have registered successfully')
})
//connecting with backend or html page
app.post('/api/register', (req, res)=>{
    //console.log(req)   //this will give data in unzreadable form so how can we make this readble?
    console.log(req.body)  //by using body parser-----give readable data 
    res.redirect('/register/success') //sending route to the another.


})


app.listen(5000, ()=>{
    console.log('server is up')
})
