const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
    email: { type: String, unique: true },
    orignalPass: String,
    password: String,
    firstName: String,
    lastName: String,
})

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    orignalPass: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: {type: ObjectId , unique: true},
    purchased: [{
        title: {type: String, uniqueItems: true},
        courseId: {type: String, uniqueItems: true}
    }]
})

const UserModel = mongoose.model('user', userSchema)
const AdminModel= mongoose.model('admin', adminSchema)
const CourseModel = mongoose.model('course', courseSchema)
const PurchaseModel = mongoose.model('purchase', purchaseSchema)

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}