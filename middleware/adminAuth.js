const  { AdminModel } = require('../db/db')
require('dotenv').config()
const jwt = require('jsonwebtoken')

async function adminAuth(req, res, next){
    const token = req.headers.token 

    const verified = jwt.verify(token, process.env.JWT_SECERAT_ADMIN)

    if(verified){
        req.userId = verified
    }
    else{
        res.status(404).json({message: "bad authentation"})
    }
    next()
}

module.exports = {
    adminAuth,
}