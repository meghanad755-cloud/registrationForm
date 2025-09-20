const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName :{
        type:String
    },
    lastName : {
        type:String
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       // minlength:4,
       // maxlength:15
    },
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;