const mongoose=require('mongoose')

const connectionRequestSchema=new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not supported`
        }
    }
},
{
    timestamps:true
}
)

//ConnectionRequest.find({fromUserId:38903434,toUserId:w4wr890348909843834})
connectionRequestSchema.index({fromUserId:1,toUserId:1})
//this is the connection request called every time if connection is made
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send the connection requestion to ourself")
    }
    next()

})
const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)


module.exports=ConnectionRequestModel