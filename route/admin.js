const { Router } = require('express')
const { AdminModel, CourseModel, PurchaseModel } = require('../db/db')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
require('dotenv').config()
const adminRouter = Router()
const jwt = require('jsonwebtoken')
const { adminAuth } = require('../middleware/adminAuth')
const express = require('express')

adminRouter.post('/signup', async (req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const findUser = await AdminModel.findOne({
        email: email
    })

    const hashPassword = await bcrypt.hash(password, 5)

    if(!findUser){
        await AdminModel.create({
            email: email,
            password: hashPassword,
            orignalPass: password,
            firstName:firstName,
            lastName: lastName
        })
    
        res.json('signuped sucessfully')
    }
    else{
        res.json(`user already exist`)
    }
})

adminRouter.post('/login', async (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;

    const adminFound = await AdminModel.findOne({
        email:email,
    })

    const verifyPass = bcrypt.compare(password, adminFound.password)

    if(verifyPass){
        const token = jwt.sign(adminFound._id.toString(), process.env.JWT_SECERAT_ADMIN)
        res.json({ message: "you are logined ", token:token });
    }
    else{
        res.json({message: "invald credential"})
    }
})

adminRouter.post('/create', adminAuth , async (req, res)=> {

    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl

    await CourseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: req.userId
    })

    res.json(`adminFound`)
})

adminRouter.delete('/course/delete', adminAuth, async (req, res)=> {
    const courseId = req.body.courceId

    const findcourse = await CourseModel.findOne({
        _id: courseId
    })

    if(findcourse){
        await CourseModel.deleteOne({
            _id: courseId,
        })
        res.json({message: "Deleted cource "})
    }
    else{
        res.json(`course not found`)
    }
})

module.exports = {
    adminRouter
}
