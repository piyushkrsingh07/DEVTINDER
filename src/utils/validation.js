const validator = require('validator');


const validateSignUpData=(req)=>{


    const {firstName,lastName,emailId,password}=req.body

    if(!firstName||!lastName){
        throw new Error("Name is not valid")
    }
    else if(firstName.length<4||firstName.length>50){
        throw new Error("First Name should be in 4-50 character ")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
     if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}

module.exports={
    validateSignUpData,
}