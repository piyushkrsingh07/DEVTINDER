//  const adminAuth=(req,res,next)=>{
//     console.log("admin auth getting checked")
//   const token="xjjfjewj";
//   const isAdminAuthorized=token==="xyz"
//   if(!isAdminAuthorized){
//     res.status(401).send("Unauthorized Access")
//   }else{
//     next()
//   }
// 

// const userAuth=(req,res,next)=>{
//     console.log("user auth getting checked")
//   const token="xjjfjewj";
//   const isAdminAuthorized=token==="xyz"
//   if(!isAdminAuthorized){
//     res.status(401).send("Unauthorized Access")
//   }else{
//     next()
//   }
// }

// module.exports={adminAuth,userAuth}

//Validate the token from req.cookie

const jwt=require("jsonwebtoken")
const User = require("../models/user")



const userAuth=async(req,res,next)=>{
    try{
  const cookie=req.cookies
  const {token}=cookie

  if(!token){
throw new Error("Token is not valid")
  }

  const decodeObj=await jwt.verify(token,process.env.SECRET_URL)
  const {_id}=decodeObj;

  const user=await User.findById(_id)
  if(!user){
    throw new Error("User Not Found")
  }

  req.user=user
  next()
}catch(err){
    res.status(400).send("ERROR: "+err.message)
}
}

module.exports={userAuth}