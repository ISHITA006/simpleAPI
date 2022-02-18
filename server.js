const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userController = require('./controller/userController.js');


mongoose.connect('mongodb://localhost:27017/simpleAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(bodyParser.json())

app.use('/users', userController);

app.listen(3000, () =>{
    console.log('Server up at 3000')
})

//TESTING APIS

//GET ALL USERS
//  http://localhost:3000/users/

//GET PARTICULAR USER (replace object id with objectId of particular user in mongodb database)
// http://localhost:3000/users/620f762b505a416186928ef1

//POST (ADD) NEW USER TO DATABASE
// http://localhost:3000/users/post
// Request type: POST
// Request body (JSON): {"name":"newName","username":"newUsername"}

//UPDATE PARTICULAR STUDENT (replace object id with objectId of particular user in mongodb database)
// http://localhost:3000/users/620f6e107e1d1e70e2a269f
// Request type: PUT
// Request body (JSON): {"name":"updatedName","username":"updatedUsername"}

//DELETE PARTICULAR USER (replace object id with objectId of particular user in mongodb database)
// http://localhost:3000/users/620f6e107e1d1e70e2a269f
// Request type: DELETE

