const AuthorModel = require("../schema/author.schema");
const BookModel = require("../schema/books.schema");
const BaseError =  require("../Utils/base.error")

///////// get auth
const getAuth = async (req, res, next) => {
try {
    const foundAuth = await AuthorModel.find();
    if (foundAuth.length === 0) {
        return next(BaseError(404, "Authors not found"))
    }
    res.status(200).json(foundAuth)
} catch (error) {
    next(error)
}
}

//////////// get one Auth
const getOneAuth = async (req, res, next) => {
   try {
    const id = req.params.id
    const foundAuth = await AuthorModel.findById(id)
    if (!foundAuth) {
        return next(BaseError(404, "Authors not found"))
        
    }
    const foundBooks = await BookModel.find({author: id})
    res.status(200).json({auth: foundAuth, books: foundBooks})
   } catch (error) {
        next(error)
   }
}

/////////// search Auth 
const searchAuth = async (req, res, next) => {
try {
    if(req.query.fullName) {
        const results = await AuthorModel.find({
            fullName: {$regex: req.query.fullName, $options: "i"}
        })
        res.json(results) 
    }
} catch (error) {
   next(error) 
}
}

////////// add Auth
const addAuth = async (req, res, next) => {
    try {
        await AuthorModel.create(req.body)
        res.status(201).json({
            message: "new add Auth"
        })
    } catch (error) {
        next(error)
    }
}

/////// update Auth
const updateAuths = async (req, res, next) => {
    try {
        const id = req.params.id
        const foundAuth = await AuthorModel.findById(id)
        if (!foundAuth) {
           return next(BaseError(404, "Authors not found"))
            }
        
            await AuthorModel.findByIdAndUpdate(id, req.body)
            res.status(200).json({
                message: "Auth date update"
            })
    } catch (error) {
        next(error)
    }
    }


////////// delete Auth
const deleteAuths = async (req, res, next) => {
    try {
        const id = req.params.id
        const foundAuth = await AuthorModel.findById(id)
        if (!foundAuth) {
            return next(BaseError(404, "Authors not found"))
            
        }
        await AuthorModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Auth deleted!"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAuth,
    getOneAuth,
    searchAuth,
    addAuth,
    updateAuths,
    deleteAuths
}