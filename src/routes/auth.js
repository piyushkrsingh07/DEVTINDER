const express=require('express')
const authRouter=express.Router()
const {validateSignUpData}=require("../utils/validation")
const User=require("../models/user")
const bcrypt=require("bcrypt")


authRouter.post("/signup",async(req,res)=>{


  try{

    validateSignUpData(req)

    const {firstName,lastName,emailId,password}=req.body;

    const passwordHash= await bcrypt.hash(password,10)
    console.log(passwordHash)
    const user=new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    })
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });

  }catch(error){
res.status(400).send("Error saving the user:"+error.message)
  }
})



authRouter.post("/login",async(req,res)=>{
  try{
  const {emailId,password}=req.body;

  const user=await User.findOne({emailId:emailId})
  if(!user){
    throw new Error("Invalid Credentials")
  }
  const isPasswordValid = await user.validatePassword(password);
  if(isPasswordValid){
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send("Login Successfully")
  }
  else{
    throw new Error("Invalid Credentials")
  }
  }catch(error){
    res.status(400).send("Error loggin in the user:"+error.message)
  }
})

module.exports=authRouter