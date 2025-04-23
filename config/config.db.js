const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb database connected succesfuly");
         
    } catch (error) {
        console.log("Eror with connecting MONGODB" + error);
        
    }
}

module.exports = connectDB

