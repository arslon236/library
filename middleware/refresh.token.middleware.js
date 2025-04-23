const jwt = require("jsonwebtoken")
const BaseError = require("../Utils/base.error")
const { accessToken, refreshToken } = require("../Utils/token.generator")

const tokenMiddleware = (req, res, next) => {
    const token =  req.headers.cookie
    
    if(!token){
        throw BaseError.Unauthorized("token not found")
    }

    const refresh = token.split(" ")[1].slice(13)
    
    if(!refresh){
        throw BaseError.Unauthorized("token not found")
    }

    const decode = jwt.verify(refresh, process.env.REFRESH_SECRET_KEY)
    if(!decode){
        throw BaseError.Unauthorized("invalid token")
    }
    req.user= decode
    const payload = {email: req.user.email, id: req.user.id, role: req.user.role} 
    const accessResult = accessToken(payload) 
    const refreshResult = refreshToken(payload)

    res.cookie("accessToken", accessResult, {httpOnly: true, maxAge: 20 * 60 * 1000})
    res.cookie("refreshToken", refreshResult, {httpOnly: true, maxAge: 10 * 24 *60 * 60 * 1000})

    next()
}

module.exports = tokenMiddleware
