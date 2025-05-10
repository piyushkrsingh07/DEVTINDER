const mongoose=require('mongoose')


const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema=new mongoose.Schema({
   firstName:{
    type:String,
    required:true,
    index:true,
    minLength:4,
    maxLength:50
   },
   lastName:{
    type:String
   },
   emailId:{
    type:String,
    required:true,
    unique:true, //mongo db uniquely create a index for unique field
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
         console.log("see value",value)
         throw new Error("Invalid email address "+value)
      };
    }
   },

   password:{
    type:String,
    required:true,
//     validate(value){
//       if(!validator.isStrongPassword(value)){
// throw new Error("Not valid password enter strong password",value)
//       }
//     }
  
   },
   age:{
    type:Number,
    min:18
   },
   photoUrl:{
    type:String,
    default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
    validate(value){
      if(!validator.isURL(value)){
throw new Error("Not valid url",value)
      }
    }
   },
   about:{
   type:String,
   default:"This is the default about of the user"
   },

   gender:{
    type:String,
    enum:{
      values:["male","female","other"],
      message:`{VALUE} is not a valid gender type`
    },
    validate(value){
      if(!["male","female","other"].includes(value)){
         throw new Error("Gender data is not valid")
      }
    }
   },
   skills:{
      type:[String]
   },

   
},{
   timestamps:true
})

//methods to create methods for user schema 

// User.find({firstName:"Piyush",lastName:"Saini"})
userSchema.index({firstName:1,lastName:1})  //isse queries fast ho jaengi

userSchema.methods.getJWT=async function(){

   const user=this; //inside arrow function this does not work
   const token=await jwt.sign({_id:user._id},process.env.SECRET_URL,{
      expiresIn:"1d",
   })
   return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
   const user=this;
   const passwordHash=user.password;
   const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash)
   if (!bcrypt) {
      console.log("bcrypt nhi aaya")
      throw new Error("bcrypt is not loaded in validatePassword");
    }

   return isPasswordValid
}


module.exports=mongoose.model("User",userSchema)