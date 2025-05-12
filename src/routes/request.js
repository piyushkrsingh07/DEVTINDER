const express=require('express')

const requestRouter=express.Router()

const {userAuth}=require("../middlewares/auth");
const ConnectionRequestModel = require('../models/connectionRequest');
const user = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
      try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid Status Type:" +status})
        }

    
         
        //if there is an existing connectionRequest
        const toUser=await user.findById(toUserId)
        if(!toUser){
            return res.status(404).json({message:"User not found "})
        }

        const existingConnectionRequest=await ConnectionRequestModel.findOne({
            $or:[
               { fromUserId,toUserId},
               {fromUserId:toUserId,toUserId:fromUserId}
            ]
       


        })

        if(existingConnectionRequest){
            return res.status(400).send({message:"Connection Request already exist"})
        }
        
        const connectionRequest=new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        })

      

        

        const data=await connectionRequest.save()

        res.json({
            message:req.user.firstName+" is "+status+" in " +toUser.firstName,
            data,
        })

      }catch(error){
        res.status(400).send({ message: "ERROR: " + error.message }); 
      }

    })

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const requestId=req.params.requestId;
        const status=req.params.status;

        //LoggedInUser= toUserId
        //status = interested
        //request id should be valid

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status is not allowed"})
        }

        const connectionRequest=await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        })

        if(!connectionRequest){
            return res.status(404).json({message:"Connection request not found"})
        }

        connectionRequest.status=status
        const data=await connectionRequest.save()
        res.json({message:"Connection request "+status,data})


    }catch(error){
        res.status(400).send("ERROR: "+ error.message)
    }
    

})

    module.exports=requestRouter