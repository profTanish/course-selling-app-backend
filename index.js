const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { userRouter } = require('./route/user')
const { adminRouter } = require('./route/admin')
const { localRouter } = require('./route/local')
const app = express()

mongoose.connect("mongodb+srv://ngxfrost:$$$itsTanish2005@cluster0.s3ijr.mongodb.net/Real-project")

app.use(express.json());
app.use('', localRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.listen(3000)