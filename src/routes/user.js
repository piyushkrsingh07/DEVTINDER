const express=require('express')
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest=require("../models/connectionRequest")
const User = require('../models/user')
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


//:status ->this is params
//?limit=3 ->this is query
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
//User should see all the cards expect
//0. his own card
//1. his connections
//3. ignored people
//4.already send connection request

const loggedInUser=req.user;
const page =parseInt(req.query.page) || 1;
let limit=parseInt(req.query.limit) || 10

limit=limit > 50?50:limit
const skip=(page-1)*limit;
//find all the connection request (sent+received)
//i don't want them in my feed
const connectionRequest=await ConnectionRequest.find({
 $or:[
    {fromUserId:loggedInUser._id},
    {toUserId:loggedInUser._id}
 ]
}).select("fromUserId toUserId").populate("fromUserId","firstName").populate("toUserId","firstName")

const hideUserFromFeed=new Set()
connectionRequest.forEach((req)=>{
    hideUserFromFeed.add(req.fromUserId._id.toString())
    hideUserFromFeed.add(req.toUserId._id.toString())
   
})

const user=await User.find({
  $and:[
    {_id:{$nin:Array.from(hideUserFromFeed)}}, //not in this array
    {_id:{$ne:loggedInUser._id}},  //$ne->not equal to
  ]
}).select(USER_SAFE_DATA).skip(skip).limit(limit)
res.send(user)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})
module.exports=userRouter