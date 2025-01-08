let { Router } = require('express')
let { UserModel, AdminModel, CourseModel, PurchaseModel } = require('../db/db')
let bcrypt = require('bcrypt')
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId
let z = require('zod')
require('dotenv').config()
let userRouter = Router()
let jwt = require('jsonwebtoken')
let { userAuth } = require('../middleware/userAuth')

//Create a end point of signup 
userRouter.post('/signup', async (req, res)=> {

    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let hashPassword = await bcrypt.hash(password, 5)

    await UserModel.create({
        email: email,
        password: hashPassword,
        orignalPass: password,
        firstName:firstName,
        lastName: lastName
    })

    res.json('signuped sucessfully')
})

//Create a end point of Login process
userRouter.post('/login', async (req, res)=> {
    let email = req.body.email;
    let password = req.body.password;    let existingPurchase = await PurchaseModel.findOne({ userId: req.userId });

    let userFound = await UserModel.findOne({
        email:email,
    })

    let verifyPass = bcrypt.compare(password, userFound.password)

    if(verifyPass){
        let token = jwt.sign(userFound._id.toString(), process.env.JWT_SECERAT_USER)
        res.json({ message: "you are logined ", token:token });
    }
    else{
        res.json({message: "invald credential"})
    }
})

//Create a end point to see all courses
userRouter.post('/Preview', userAuth, async (req, res)=> {
    let allCourses = await CourseModel.find();
    res.json(allCourses);
})

//Create a end point of preview purchased courses
userRouter.post('/course/purchases', userAuth, async (req, res)=> {
    let corsesPurchases = await PurchaseModel.findOne({userId: req.userId})
    res.json({corsesPurchases})
})

//Create a end point of purchase a course
userRouter.post('/course/purchase', userAuth, async (req, res) => {
    try {
        const courseId = req.body.courseId;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        const courseIdFound = await CourseModel.findById(courseId);
        if (!courseIdFound) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingPurchase = await PurchaseModel.findOne({
            userId: req.userId,
            'purchased.courseId': courseIdFound._id
        });

        if (existingPurchase) {
            return res.status(400).json({ message: "Course already purchased by this user" });
        }

        let purchaseModelFound = await PurchaseModel.findOne({ userId: req.userId });

        if (!purchaseModelFound) {
            await PurchaseModel.create({
                userId: req.userId,
                purchased: [{
                    title: courseIdFound.title,
                    courseId: courseIdFound._id
                }]
            });
            return res.json({ message: "New purchase record created" });
        } else {
            const updatedPurchase = await PurchaseModel.updateOne(
                { userId: req.userId },
                { $push: { purchased: { title: courseIdFound.title, courseId: courseIdFound._id } } }
            );
            console.log("Updated Purchase:", updatedPurchase);
            return res.json({ message: "Course added to existing purchase record" });
        }
    } catch (error) {
        console.error("Error processing purchase:", error);
        return res.status(500).json({ message: "An error occurred while processing the purchase" });
    }
});

module.exports = {
    userRouter
}
