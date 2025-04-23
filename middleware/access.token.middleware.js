    const jwt = require("jsonwebtoken")
    const BaseError = require("../Utils/base.error")

    const checkAdmin = (req, res, next) => {
        const accessToken =  req.headers.cookie
        if(!accessToken){
            throw BaseError.Unauthorized("token not found")
        }

        const access = accessToken.split(" ")[0].slice(12)
        if(!access){
            throw BaseError.Unauthorized("accessToken not found")
        }
    
        
        const decode = jwt.verify(access.slice(0, -1), process.env.ACCESS_SECRET_KEY)

        req.user = decode

        const roles = ["superadmin", "admin"]
        const userRole = req.user.role.toLowerCase();

        if(!roles.includes(userRole)){
            throw BaseError.Unauthorized("you do not have access for this action")
        }

        next()
    }

    module.exports = checkAdmin