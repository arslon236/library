const mongoose = require("mongoose")
// const currentYear = new Data().getFullYear()
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "kitob nomi berilishi shart"],
        minLength: [2, "kitob nomi kamida 2 ta harf bolishi kerak"]
    },
    pages: {
        type: Number,
        required: [true, "kitob varaqasi  berilishi shart"],
        min: [25, "kitob varaqasi kamida 25 varqa bolishi shart!"]
    },
    year: {
        type: Number,
        required: [true, "kitob yili berilishi shart"]
    },
    price: {
        type: Number,
        required: [true, "kitob narxi berilishi shart"],
        min: [5000, "kitob narxi kamida 5000 ming bolishi kerak"]
    },
    country: {
        type: String,
        required: [true, "kitobni davlati berilishi shart"],
        minLength: [3, "kitob davlati kamida 3 ta harf bolishi kerak"]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "author",
        required: [true, "kitob mualifi berilishi shart"],
        minLength: [2, "kitob mualifi kamida 2 ta harf bolishi kerak"]
    },
    description: {
        type: String,
        required: [true, "kitob tavsifi berilishi shart"],
        minLength: [3, "kitob  tavsifi kamida 3 ta harf bolishi kerak"]
    },
},
{versionKey: false, timestamps: true}
)
const BookModel = mongoose.model("books", bookSchema)

module.exports = BookModel


