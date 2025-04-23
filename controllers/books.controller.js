const BookModel = require("../schema/books.schema")
const BaseError = require("../Utils/base.error")

///////// get books
const getBooks = async (req, res, next) => {
    try {
        
        const foundBooks = await BookModel.find().populate("author", "-_id -dateOfBrith -dateOfDeath -country -bio");
        if (foundBooks.length === 0) {
            return next(BaseError(404, "Authors not found"))
        }
        res.status(200).json(foundBooks)
    } catch (error) {
            
    }

}

//////////// get one book
const getOneBooks = async (req, res, next) => {
    try {
        
        const id = req.params.id
        const foundBook = await BookModel.findById(id)
        if (!foundBook) {
            return next(BaseError(404, "Authors not found"))
            
        }
        res.status(200).json(foundBook)
    } catch (error) {
        next(error)
    }
}

/////////// search book 
const searchBook = async (req, res, next) => {
    try {
        
        if(req.query.title) {
            const results = await BookModel.find({
                title: {$regex: req.query.title, $options: "i"}
            })
            res.json(results) 
        }
    } catch (error) {
       next(error) 
    }
}

////////// add book
const addBook = async (req, res) => {
    try {
        await BookModel.create(req.body)
        res.status(201).json({
            message: "new add book"
        })
    } catch (error) {
        next(error)
    }
}

/////// update book
const updateBooks = async (req, res) => {
    const id = req.params.id
    const foundBook = await BookModel.findById(id)
    if (!foundBook) {
        return res.status(404).json({
            message: "Book not found"
        })
        
    }
    await BookModel.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        message: "Book date update"
    })
}

////////// delete book
const deleteBooks = async (req, res) => {
    const id = req.params.id
    const foundBook = await BookModel.findById(id)
    if (!foundBook) {
        return res.status(404).json({
            message: "Book not found"
        })
        
    }
    await BookModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "Book deleted!"
    })
}


module.exports = {
    getBooks,
    addBook,
    getOneBooks,
    updateBooks,
    deleteBooks,
    searchBook
}