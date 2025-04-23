const mongoose = require("mongoose")
// const currentYear = new Data().getFullYear()
const authorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "mualif nomi berilishi shart"],
        minLength: [2, "mualif nomi kamida 2 ta harf bolishi kerak"],
        maxLength: [100, "mualif nomi maxsimal 100 ta harf bolishi kerak"]
    },
    dateOfBrith: {
        type: Date,
        required: [true, "mualif tugulgan sana  berilishi shart  berilishi shart"]
    },
    dateOfDeath: {
        type: Date,
        required: false
    },
    country: {
        type: String,
        required: [true, "mualif davlati berilishi shart"],
        minLength: [3, "mualif davlati kamida 3 ta harf bolishi kerak"]
    },
    bio: {
        type: String,
        required: [true, "mualif tavsifi berilishi shart"],
        minLength: [3, "mulaif  tavsifi kamida 3 ta harf bolishi kerak"]
    },
},
{versionKey: false, timestamps: true}
)
const AuthorModel = mongoose.model("author", authorSchema)

module.exports = AuthorModel


