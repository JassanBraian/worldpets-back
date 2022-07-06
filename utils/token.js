const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signToken = (id) =>{
  return jwt.sign(
    {id},
    process.env.SECRET_TOKEN,
    {expiresIn:process.env.JWT_EXPIRES_IN}
    )
}
exports.resetSignToken = (id) => {
  return jwt.sign(
    {id},
    process.env.RESET_SECRET_TOKEN,
    {expiresIn:process.env.RESET_JWT_EXPIRES_IN}
  )
}