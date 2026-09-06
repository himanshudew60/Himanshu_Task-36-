const User = require("../models/User");
const jwt = require('jsonwebtoken')

const creatToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1m'})
}

const logiUser = async(req,res) => {
   const {email, password} =req.body

   try{
    const user = await User.login(email,password)

    const token = creatToken(user._id)

    res.status(200).json({
        msg:"login Succesfull",
        email,token})
   }catch(error){
    res.status(400).json({ error: error.message})
   }
}
const signupUser = async(req,res) => {
   const {email, password} =req.body

   try{
    const user = await User.signup(email,password)

    const token = creatToken(user._id)

    res.status(200).json({
        msg:"User Registerd Succesfull",
        email,token})
   }catch(error){
    res.status(400).json({ error: error.message})
   }
}

const getUser = async (req, res) => {
  try {
    res.status(200).json({
      msg: "Protected route accessed successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
logiUser,
signupUser,
getUser
};
