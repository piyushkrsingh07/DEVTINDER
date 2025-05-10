const express=require('express');
const connectDB = require('./config/database');



const app=express();

const User=require("./models/user")


const cookieParser=require("cookie-parser")



app.use(express.json())

app.use(cookieParser())




//this middleware will read the json object convert it into js object and will js object to body
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")

const requestRouter=require("./routes/request")

app.use("/",authRouter)

app.use("/",profileRouter)
app.use("/",requestRouter)

connectDB().then(() => {
    // Start the server only after DB connects
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.error("Database cannot be connected",err)
  })


