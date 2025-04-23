
const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username kiritilishi shart"]
    },
    email: {
        type: String,
        required: [true, "email kiritilishi shart"]
    },
    password: {
        type: String,
        required: [true, "parol kiritilishi shart"]
    },
    role: {
        type: String,
        required: false,
        enum: ["superadmin", "user", "admin"],
        default: "user"
    },
    otp: {
        type: String,
        required: false,
        default: 0
    }, 
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    lastTime: {
        type: Date,
        required: false,
        default: 0
    }
},{versionKey: false})


const AuthModel = mongoose.model("auth", authSchema)

module.exports = AuthModel