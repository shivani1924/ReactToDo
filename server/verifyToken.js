const { JsonWebTokenError } = require("jsonwebtoken");
const createError = require('http-errors')
const JWT = require('jsonwebtoken')
const jwtkey = 'f-t'



module.exports = {


verifyAccessToken: (req,res,next) => {
    if(!req.headers['authorization']) return next(createError.Uauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    console.log(token)
    JWT.verify(token,jwtkey,(err,payload)=>{
        if(err) {
            console.log(err)
            const errMessage = 
                err.name === JsonWebTokenError ? 'Unauthorized' : err.errMessage

            return next(createError.Unauthorized(errMessage))

        }
        req.payload = payload
        next()
    })
}
}