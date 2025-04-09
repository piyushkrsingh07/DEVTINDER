const express=require('express');
const connectDB = require('./config/database');



const app=express();

const User=require("./models/user")

const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")

const {validateSignUpData}=require("./utils/validation")
const jwt=require("jsonwebtoken")
app.use(express.json())

app.use(cookieParser())


//this middleware will read the json object convert it into js object and will js object to body








app.post("/signup",async(req,res)=>{
  try{
        console.log(req.body)
        validateSignUpData(req)

        //Validation of data is required

        const {password,firstName,lastName,emailId}=req.body
       
        const passwordHash=await bcrypt.hash(password,10)
  

        //Encrypt the password then store the user into database

        const user=new User({
          firstName,
          lastName,
          emailId,
          password:passwordHash
        })  //create a new instance of user object


    



     


   await user.save(); //return a promise

   res.send("user added successfully")
     }catch(error){
        // res.status(404).json({error:error.message})
     res.status(400).send("Error saving the user"+error.message)
     }
   

}
)

app.post("/login",async(req,res)=>{
  try{
const {emailId,password}=req.body;

const user=await User.findOne({emailId:emailId})
console.log(user,"dekh user")
if(!user){
  return res.status(404).send("Invalid Credential")
}

const isPasswordValid=await bcrypt.compare(password,user.password)

if(isPasswordValid){
   //create a jwt token
const token=await jwt.sign({_id:user._id},"DEV@Tinder$790")

   res.cookie("token",token)
   res.send("login successfull")


  
}
else{
  throw new Error("Invalid credential")
}





  }catch(error){
    res.status(404).send("Error saving the user"+error.message)
  }
})

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

app.get("/userprofile",async(req,res)=>{
  try{
  const cookies=req.cookies;
  console.log("dekh cookie",cookies)
 const {token}=cookies;
//Validate my token

if(!token){
  throw new Error("Invalid token")
}

const decodedMessage=await jwt.verify(token,"DEV@Tinder$790")
console.log(decodedMessage)

const {_id}=decodedMessage
console.log("logged in user is: " +_id)

const user=await User.findById(_id);

if(!user){
throw new Error("user not found")
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
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    
    try{
    //  const updatedData=await User.findByIdAndUpdate(userId,data,{returnDocument:'before'}) //if anything is not in the database will be ignored by apis

    const ALLOWED_UPDATES=[
        "photoUrl","about","gender","age","userId","skills",
    
    ]
    
    const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k))


    if(!isUpdateAllowed){
  throw new Error("Updates not allowed")
    }

    // if(data?.skills?.length){
    //     throw new Error("skill can not be more than 10")
    // }


     const updatedData=await User.findByIdAndUpdate({_id:userId},data,
        {runValidators:true}
     )
     console.log(updatedData)
  if(!updatedData){
    res.status(405).send("user connot be updated successfully")
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


