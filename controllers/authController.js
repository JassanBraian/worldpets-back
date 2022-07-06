const User = require('../models/User');
require('dotenv').config();
const {signToken, resetSignToken} = require('../utils/token');
const sendEmail = require('../utils/mail');
const crypto = require('crypto');

exports.signup = async (req,res) => {
  try{
    const newUser = await User.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
    });
    const {name,surname,email,role} = newUser;
    const token = signToken(newUser._id);
    res.status(201).json({
      ok: true,
      token,
      data:{
        user:{name,surname,email,role}
      }
    })
  }catch(error){
      console.log(error.message);
      res.status(500).json({ok:false , msg: error.message})
  }
}
// porque tengo que generar el token cuando realizo un Register ! ¿??¿

exports.login = async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({ok: false, message: "bad request"});
    } 

    const user = await User.findOne({email}).select('+password');
    const validatePass = await user.comparePassword(password , user.password);
    if(!user || !validatePass){
      return res.status(401).json({ok: false, message: "Wrong credentials"});
    }
 
    const {name,surname,email:userEmail,role} = user;
    const token = signToken(user._id);
    return res.status(200).json({
      ok:true,
      token,
      data:{
        user:{name, surname, userEmail, role}
      }
    })
  }catch(error){
    console.log(error)
    return res.status(500).json({ok: false, error})
  }
}

exports.validarToken = async (req,res)=>{
  try{
    let token;

  }catch(error){
    res.status(500).json({message:"error"})
  }
}
exports.refreshToken = async (req, res) => {
  try{
    const email = req.body.email;
    const user = await User.findOne({email});
    console.log(user._id);
    const token = resetSignToken(user._id);
    return res.status(200).json({token})
    }catch(error){
    console.log(error);
    res.status(500).json({ok: false, message:"something went wrong"});
    }
  }


exports.forgotPassword = async (req , res) => {
  try{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({ok:false, message:"wrong credentials"});
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    const resetUrl= `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
    const message = `Forgot your password, click here to change your password ${resetUrl}`;
    await sendEmail({message, email, subject:"Forgot your password"});
    return res.status(200).json({ok:true, message:"we have sent an email to the address you indicated"});
  }catch(error){
    console.log(error);
    return res.status(500).json({ok: false, error});
  }
}
exports.resetPassword = async (req , res) => {
  try{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: {$gt: Date.now()}
    });
    if(!user){
      return res.status(400).json({ok: false, message: 'something went wrong'});
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const token= signToken(user._id);
    return res.status(200).json({ok:true, token});
  }catch(error){
    console.log(error);
    return res.status(500).json({ok:true, error});
  }
}