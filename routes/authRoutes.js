const { Router } = require('express');
const authRouter = Router();
const {signup, login} = require('../controllers/authController');

authRouter.route('/signup')
            .post(signup)

authRouter.route('/login')
            .post(login)




module.exports = authRouter;