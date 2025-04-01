const express=require('express');

const app=express();




// app.use("/hello/2",(req,res)=>{
//     res.send("aabra ka dabra")
 
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello Hello Hello")
 
// })
app.use("/user",(req,res)=>{
    res.send("haaahaha")
})

app.get("/user",(req,res)=>{
    res.send({firstName:"Piyush",lastName:"Kumar"})
})

app.post("/user",(req,res)=>{
    console.log("save data to db");
    res.send("Data successfully saved to the database")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted successfully")
})

app.use('/test',(req,res)=>{
    res.send("Hello from the server")
})

// app.use("/",(req,res)=>{
//     res.send("namaste from dashboard ")
 
// })



app.listen(7778,()=>{
    console.log("server is successfully listen on port 7778.....")
})
