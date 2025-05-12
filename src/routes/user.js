const express=require('express')
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest=require("../models/connectionRequest")
const userRouter=express.Router()

const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills"
//get all the pending connection request for logged in user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
    const loggedInUser=req.user;

    const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",
    }).populate("fromUserId",["firstName","lastName","photoUrl","age","about","gender","skills"]) // .populate("fromUserId","firstNm")
    
    //hme pta hona chahiye ki kis kis n request bhji h
    res.json({message:"Data fetched Successfully",data:connectionRequest})
    }catch(error){ 
        res.status(400).send({ message: "ERROR: " + error.message }); 
    }

})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
const loggedInUser=req.user;
const connectionRequests=await ConnectionRequest.find({
    $or:[
        {toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"},
    ]

}).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

console.log(connectionRequests)
const data=connectionRequests.map((row)=>{
    if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
        return row.toUserId
    }
    else{
        return row.fromUserId
    }
    
})

res.json({message:"Connection fetch Successfully",data:data})



    }catch(error){
        res.status(400).send({ message: "ERROR: " + error.message }); 
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{

    }catch(error){
        res.status(400).json({message:error.message})
    }
})
module.exports=userRouter