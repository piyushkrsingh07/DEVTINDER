const mongoose=require('mongoose')
require('dotenv').config()


const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_DB_URI)
}


connectDB().then(()=>{
  console.log("Database connection succesfully ")
}).catch((err)=>{
   console.error("Database connection cannot be completed")
})

module.exports = connectDB;



