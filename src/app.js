const express=require('express');
const connectDB = require('./config/database');

const app=express();

const User=require("./models/user")
app.use(express.json())
//this middleware will read the json object convert it into js object and will js object to body








app.post("/signup",async(req,res)=>{
        console.log(req.body)

        const user=new User(req.body)  //create a new instance of user object


    



     try{


   await user.save(); //return a promise

   res.send("user added successfully")
     }catch(error){
        // res.status(404).json({error:error.message})
     res.status(400).send("Error saving the user"+error.message)
     }
   








}
)

// app.get("/feed",(req,res))

//get user by email

app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    
    try{
        console.log(userEmail)
    const user= await User.findOne({emailId:userEmail})

      
  
    if(!user){
        console.log("here it is ")
       return res.status(404).send("user not found")
    }
    
        res.send(user)


   
    }catch(error){
        console.error("Error fetching user:", error); // Always log the error
        res.status(500).send("Something went wrong");
    }

})

//DELETE THE USER
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId
    try{
       const user=await User.findByIdAndDelete({_id:userId}) //const user=await user.findByIdAndDelete({_id:userId})
       if(!user){
       
       return res.status(404).send("user not found")
    }
    else{
        res.send("user deleted successfully")
    }
       
    }catch(error){
    console.error("Error fetching user:", error); // Always log the error
        res.status(500).send("Something went wrong");
    }

})

//update by userId
app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    

    try{
    //  const updatedData=await User.findByIdAndUpdate(userId,data,{returnDocument:'before'}) //if anything is not in the database will be ignored by apis
     const updatedData=await User.findByIdAndUpdate({_id:userId},data,
        {runValidators:true}
     )
     console.log(updatedData)
  if(!updatedData){
    res.send("user connot be updated successfully")
  }
  else{
    res.send("user updated successfully")
  }
    }catch(error){
        console.error("Error fetching user:", error); // Always log the error
        res.status(400).send("UPDATE FAILED:"+ error.message);
    }
})


app.get("/feed",async(req,res)=>{
    try{
const users=await User.find({})
res.send(users)


    }catch(error){
        res.status(400).send("Somethong went wrong")
    }
})

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


