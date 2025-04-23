const jwt = require("jsonwebtoken")

const accessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: "20m"})
}

const refreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: "10d"})
}

module.exports = {
    accessToken,
    refreshToken
}