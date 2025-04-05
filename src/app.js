const express=require('express');
const connectDB = require('./config/database');

const app=express();

const User=require("./models/user")









app.post("/signup",async(req,res)=>{
       
    

    const user=new User(
        {
            firstName:"Piyush",
            lastName:"Kumar",
            emailId:"piyush02040@gmail.com",
            password:"piyush@123",
        }
    )


     try{


   await user.save(); //return a promise

   res.send("user added successfully")
     }catch(error){
        // res.status(404).json({error:error.message})
     res.status(400).send("Error saving the user"+err.message)
     }
   








}
)

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


