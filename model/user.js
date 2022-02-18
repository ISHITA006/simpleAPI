const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true},
}, {collection: 'users'})

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model


//eg of a user
//{"name":"Ishita","username":"ishita006"}