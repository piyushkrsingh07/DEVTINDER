const mongoose=require('mongoose')


const validator = require('validator');

const userSchema=new mongoose.Schema({
   firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50
   },
   lastName:{
    type:String
   },
   emailId:{
    type:String,
    required:true,
    unique:true,
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

userSchema.methods.getJWT=async function(){

   const user=this;
   const token=await jwt.sign({_id:user._id},process.env.SECRET_URL,{expiresIn:'1d'})
   return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
   const user=this;
   const passwordHash=user.password;
   const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash)

   return isPasswordValid
}


module.exports=mongoose.model("User",userSchema)