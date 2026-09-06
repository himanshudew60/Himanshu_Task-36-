const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
      
      email: {
        type: String,
        required: true,
        unique:true
      },
      password: {
        type: String,
        required: true,
      },
    
    
  }
);


userSchema.statics.signup =async function (email,password){
    const exists = await this.findOne({email})

    if(!email || !password){
      throw Error('All fields are required')
    }
    if(!validator.isEmail(email)){
      throw Error('email is not valid')
    }
    if(!validator.isStrongPassword(password)){
      throw Error('password is not strong')
    }

    if(exists){
        throw Error('Email already exists')
    }
    const salt =await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash})

    return user;
}

userSchema.statics.login =async function (email,password){
      if(!email || !password){
      throw Error('All fields are required')
    }
    const user = await this.findOne({email})

     if(!user){
        throw Error('Incorrect Email')
    }

    const match =await bcrypt.compare(password,user.password)

    if(!match){
      throw Error('incorrect password')
    }

    return user
}

const User = mongoose.model("User", userSchema);

module.exports = User;