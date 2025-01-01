const { Router } = require('express')
const { UserModel, AdminModel, CourseModel, PurchaseModel } = require('../db/db')
const mongoose = require('mongoose')
const localRouter = Router()

localRouter.get('/course/Preview', async (req, res)=> {
    const allCourses = await CourseModel.find();
    res.json(allCourses);
})

module.exports = {
    localRouter
}
