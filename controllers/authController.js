const User = require('../models/User');
require('dotenv').config();
const {signToken} = require('../utils/token');

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
    if(!email || !password) return res.status(400).json({ok: false, message: "bad request"});

    const user = await User.findOne({email}).select('+password');
    const validatePass = await user.comparePassword(password , user.password);
    if(!user || !validatePass) return res.User(401).json({ok: false, message: "Wrong credentials"});

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
    console.log(error);
    res.status(500).json
  }
}