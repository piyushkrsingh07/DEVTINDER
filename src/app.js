const express=require('express');
const connectDB = require('./config/database');

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


// app.use("/user",[
//     (req,res,next)=>{
//         console.log("Handling the route user 1")
      

//       next();
    

// },
// (req,res,next)=>{
//     console.log("Handling the route user 2")
//     next()
 
// },
// ],
// (req,res,next)=>{
//     console.log("Handling the route user 3")
//     next()
// },
// (req,res,next)=>{
//     console.log("Handling the route user 4")
//     res.send("4th Response")

// }
// )

// app.get("/user",(req,res,next)=>{
//     console.log("Handling the route user 1!!")

//     next()
   
// })

// app.get("/user",(req,res,next)=>{
//     console.log("Handling the route user 2!!")
    
//    res.send("response 2 done")
//    next()
// })



// app.get("/",(req,res,next)=>{
//     next()
// })
// app.get("/user",
//     (req,res,next)=>{
//    console.log("Handling /user route")
//    next()
// },
// (req,res,next)=>{
//     next();

// },
// (req,res,next)=>{
//     res.send("2nd route handler")
// }
// )

//Handle Auth Middleware if the request is authorized
// app.use("/admin",(req,res,next)=>{
//     console.log("admin auth getting checked")
//   const token="xjjfjewj";
//   const isAdminAuthorized=token==="xyz"
//   if(!isAdminAuthorized){
//     res.status(401).send("Unauthorized Access")
//   }else{
//     next()
//   }
// })

// const {adminAuth,userAuth}=require("./middlewares/auth")

// app.use("/admin",adminAuth)

// app.post("/user/login",(req,res)=>{
//      res.send("User login in successfully")
// })

// app.get("/user",userAuth,(req,res)=>{
//     res.send("user data sent")
// })
// app.get("/admin/getAllData",(req,res)=>{

// res.send("Admin auth is geeting checked!!")


// })

// app.delete("/admin/deleteUser",(req,res)=>{
//    res.send("Deleted a user")
// })


// app.get("/getUserData",(req,res)=>{
         
//     try{ 

//         throw new Error("bjkfjjbdsf")
//         res.send("User data sent")
//     }catch(error){
//          res.status(500).send("Some Error Contact support team")
//     }
    



  

// })

//     //for some unhandled error

//     app.use("/",(error,req,res,next)=>{ 
//         if(error){

           
//             res.status(500).send("Something went wrong")
//         }
//     })

// app.listen(7777,()=>{
//     console.log("server is successfully listen on port 7777.....")
// })

connectDB().then(() => {
    // Start the server only after DB connects
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.error("Database cannot be connected",err)
  })

