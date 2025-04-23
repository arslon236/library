const BaseError = require("../Utils/base.error")

module.exports = (err, req, res, next ) => {
    if (err instanceof BaseError) {
        res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
        return
    }

    // xatolik mongoosening ValidationErrorda bolsa
    if (err.name === "ValidationError") {
        const errorMessages = Object.values(err.errors).map((error) => error.message)
        res.status(400).json({
            message: "Validation Error",
            errors: errorMessages
        })
    }
    // xatolik Mongodb noyoblik xatolaridan bolsa
    if (err.code === 11000) {
        const fields = Object.values(err.keyValue).join(" ")
        res.status(400).json({
            message: `Duplicate value fields: ${fields}`,
            errors: errorMessages
        })
    }

    //Jwt yoki authentication bilan boglik xatoliklar
    if (err.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Invalid token",
        })
        return
    }
    if (err.name === "TokenExpiredError") {
        res.status(401).json({
            message: "Token has Expired",
        })
        return
    }
    // ummumiy xatoliklar uchun
        res.status(500).json({
            message: "Server error",
            errors: [err.message || "Unexpected error occured"]
        })

}

