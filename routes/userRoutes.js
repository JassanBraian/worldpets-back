const {Router} = require('express');
const userRouter = Router();
const { 
        getUsers,
        createUser,
        deleteUser,
        updateUser,
        getUserById,
        getUserByToken } = require('../controllers/userController');
const { restrictTo, protect } =require('../middlewares/userMiddleware')

userRouter.route('/')
        .get(protect ,restrictTo('admin'),getUsers)      
        .post(protect, createUser) // este create no sera necesario a futuro xq usare un authController 
        .put(protect,updateUser)  // ver luego ¿?¿? 

userRouter.route('/userbytoken')
        .get(protect, getUserByToken)
userRouter.route('/:id')
        .delete(protect,restrictTo('admin'), deleteUser)
        .get(getUserById)
module.exports = userRouter;