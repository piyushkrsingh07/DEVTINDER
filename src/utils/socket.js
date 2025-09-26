const socket=require("socket.io")

const initializeSocket=(server)=>{
    const io=socket(server,{
  cors:{
    origin:"http://localhost:5173"
  }
})
}

io.on("connection",(socket)=>{
    
    socket.on("joinChat",({userId,targetUserId})=>{
        const roomId=[userId,targetUserId].join(("_"))  
        console.log("Joining room",roomId)
        socket.join(room)   
    })

    socket.on("sendMessage",({firstName,userId,targetUserId,newMessage})=>{
            const roomId=[userId,targetUserId].join(("_"))  
        io.to(roomId).emit("messageReceived",{firstName,newMessage})
    })

    socket.on("disconnect",()=>{

    })
})

module.export=initializeSocket