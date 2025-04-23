const express = require("express")
require("dotenv").config()
const cors =  require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/config.db") 
const booksRoouter = require("./routes/books.routes")

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Utils/swagger');

const AuthorRoouter = require("./routes/author.routes")   
const AuthRouter = require("./routes/auth.routes")
const router = require("./routes/fileUpload.routes")

const error_middleware = require("./middleware/error.middleware")

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
connectDB()


app.use(booksRoouter)
app.use(AuthorRoouter)
app.use(router)
// app.use(CommentRouter)
app.use(AuthRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(error_middleware)



app.listen(PORT, () => {
    console.log("Server is  running at: " + PORT);
    
})