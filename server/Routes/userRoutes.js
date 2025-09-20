const express = require('express')
const{ Register, Login } = require('../Controllers/userCtrl')

const userRouter = express.Router()

// For create http request method is 'post'
userRouter.post('/register',Register)
userRouter.post('/login',Login)

module.exports = userRouter