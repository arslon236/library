const BooksValidation = require("../Validators/book.validator")

const validateBook = async (req, res, next) => {
    try {
        const {error} = BooksValidation(req.body)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        return next()
    } catch (error) {
        return new Error(error)
    }
}

module.exports = validateBook