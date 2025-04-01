const express=require('express');

const app=express();

app.use("/",(req,res)=>{
    res.send("namaste from dashboard ")
 
})

app.use("/hello",(req,res)=>{
    res.send("Hello Hello Hello Hello")
 
})

app.use('/test',(req,res)=>{
    res.send("Hello from the server")
})

app.listen(7777,()=>{
    console.log("server is successfully listen on port 7777.....")
})