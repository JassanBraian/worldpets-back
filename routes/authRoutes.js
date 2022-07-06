const { Router } = require('express');
const authRouter = Router();
const {
  signup,
  login , 
  refreshToken,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

authRouter.route('/signup')
            .post(signup)

authRouter.route('/login')
            .post(login)
authRouter.route('/refreshToken')
            .post(refreshToken)
authRouter.route('/forgotPassword')
            .post(forgotPassword)
authRouter.route('/resetPassword/:token')
            .post(resetPassword)
module.exports = authRouter;