const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.protect = async (req,res,next) => {
  try{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return res.status(401).json({ok:false, msg: "you don't  have access"});
    
    jwt.verify(token, process.env.SECRET_TOKEN, async(err, data) =>{
      if(err) return res.status(401).json({ok:false, msg: "you don't have access'"});
    
      const user = await User.findById(data.id);
      if(!user) return res.status(401).json({ok:false, msg: "you don't have access"});

      const changePass= await user.changedPasswordAfter(data.iat); 
      if(changePass){
        return res.status(401).json({ok: false, msg: "No tiene acceso 23"});
      }
      req.user=user;
      next()
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({ok: false, error});
  }
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) return res.status(403).json({ok:false, message: `you haven't authorization`})
    next();
  }
}
//este restricTo coloque el req.body.role pero debería ir el req.user.role para ver si el que esta logueado es admin o client

exports.isLoggedIn = (req, res, next) => {
  try{
    if(req.user) return next();
   return res.status(403).json({ok:false, message:"you haven't authorization"})
  }catch(error){
    console.log(error);
    return res.status(500).json({ok:false, error});
  }
}