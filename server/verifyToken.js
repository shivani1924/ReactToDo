require('dotenv').config()

const createError = require('http-errors')
const JWT = require('jsonwebtoken')
const jwtkey = 'f-t';



module.exports = {


verifyAccessToken: (req,res,next) => {
    if(!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    console.log(token)
    JWT.verify(token,jwtkey,(err,payload)=>{
        if(err) {
            const errMessage = err.name === "JsonWebTokenError" ? 'Unauthorized' : err.errMessage
            return res.status(498).json({"message":errMessage})
            // return next(createError.Unauthorized(errMessage))

        }
        if(payload){
            req.payload = payload
            next()
        }
    })
}
}