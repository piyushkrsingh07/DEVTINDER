const express=require('express');

const app=express();




// app.use("/hello/2",(req,res)=>{
//     res.send("aabra ka dabra")
 
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello Hello Hello")
 
// })
// app.use("/user",(req,res)=>{
//     res.send("haaahaha")
// })

//it will match req/user ,/user/xyz,/user/1
// app.get("/user",(req,res)=>{
//     res.send({firstName:"Piyush",lastName:"Kumar"})
// })

// app.post("/user",(req,res)=>{
//     console.log("save data to db");
//     res.send("Data successfully saved to the database")
// })

// app.delete("/user",(req,res)=>{
//     res.send("Deleted successfully")
// })

// app.use('/test',(req,res)=>{
//     res.send("Hello from the server")
// })

// app.use("/",(req,res)=>{
//     res.send("namaste from dashboard ")
 
// })

// app.get("/ab*cd",(req,res)=>{
//       res.send({firstName:"Piyush",lastName:"Kumar"})
// })
// app.get(/.*fly$/,(req,res)=>{
//       res.send({firstName:"Piyush",lastName:"Singh"})


// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send({firstName:"Piyush",lastName:"Kumar"})
// })
//to handle dynamic route

// app.get("/user/:userId/:name/:password",(req,res)=>{
//     console.log(req.params)
//          res.send({firstName:"Piyush",lastName:"Kumar"}) 
// })


app.use("/user",[
    (req,res,next)=>{
        console.log("Handling the route user 1")
      

      next();
    

},
(req,res,next)=>{
    console.log("Handling the route user 2")
    next()
 
},
],
(req,res,next)=>{
    console.log("Handling the route user 3")
    next()
},
(req,res,next)=>{
    console.log("Handling the route user 4")
    res.send("4th Response")

}
)




app.listen(7777,()=>{
    console.log("server is successfully listen on port 7777.....")
})
