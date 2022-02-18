const express = require('express');
const router = express.Router();
const  User  = require('../model/user');
var ObjectId = require('mongoose').Types.ObjectId;

//get all users in the collection
router.get('/', (req, res)=>{
    User.find((err, docs) =>{
        if(!err){ res.send(docs) }
        else{ console.log('Error in Retreiving Users :' + JSON.stringify(err, undefined, 2)); }
    })
});

//get a particular user by id 
router.get('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    User.findById(req.params.id, (err, doc) => {
        if(!err){ res.send(doc) }
        else{ console.log('Error in Retreiving User :' + JSON.stringify(err, undefined, 2)); }
    })
})

//update particular user with id
router.post('/post', async (req, res) =>{
    console.log(req.body)
    const { username, name} = req.body

    if(!username || typeof username !== 'string'){
        return res.json({status:'error', error:'Invalid username'})
    }

    if(!name || typeof name !== 'string'){
        return res.json({status:'error', error:'Invalid name'})
    }

    try{
        const response = await User.create({
            username, name
        })
        console.log("User created successfully: "+ response)
    }
    catch(error){
        if (error.code === 11000){
            return res.json({status:'error', error: 'Username already in use!'})
        }
        throw error
    }
      
    res.json({ status: 'ok' })
})

//delete particular student with id
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    var user_update = { 
        username: req.body.username,
        name: req.body.name,
     }
     User.findByIdAndUpdate(req.params.id, { $set : user_update }, { new: true }, (err, doc) => {
        if(!err){ res.send(doc); }
        else{ console.log('Error in Updating User :' + JSON.stringify(err, undefined, 2)); }
     })
})

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            })
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            })               
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        })
    })
})


module.exports = router;