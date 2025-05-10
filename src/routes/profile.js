const express=require('express')

const profileRouter=express.Router();

const {userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
          if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
          }
          const loggedInUser=req.user; //comes from auth middleware
          console.log(loggedInUser,"before")
Object.keys(req.body).forEach(key=>(loggedInUser[key]=req.body[key]))
await loggedInUser.save() //yha hmesa await lgana hai 
console.log(loggedInUser,"after")
res.json({
  message: `${loggedInUser.firstName},your profile updated successfully`,
  data:loggedInUser,
})
res.send(`${loggedInUser.firstName},profile successfully updated`)
       
          
  }catch(error){
    res.status(400).send("ERROR : " + error.message);
  }
})

module.exports=profileRouter

