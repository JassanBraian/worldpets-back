const { Router } = require('express');
const authRouter = Router();
const {
  signup,
  login , 
  refreshToken} = require('../controllers/authController');

authRouter.route('/signup')
            .post(signup)

authRouter.route('/login')
            .post(login)
authRouter.route('/refreshToken')
            .post(refreshToken)

module.exports = authRouter;