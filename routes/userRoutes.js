const {Router} = require('express');
const userRouter = Router();
const { 
        getUsers,
        createUser,
        deleteUser,
        updateUser,
        getUserById } = require('../controllers/userController');
const { restrictTo, protect } =require('../middlewares/userMiddleware')

userRouter.route('/')
        .get(restrictTo('admin'),getUsers)      
        .post(createUser) // este create no sera necesario a futuro xq usare un authController 
userRouter.route('/:id')
        .delete(restrictTo('admin'), deleteUser)
        .put(protect,updateUser)  // ver luego ¿?¿? 
        .get(getUserById)

module.exports = userRouter;