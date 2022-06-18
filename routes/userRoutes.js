const {Router} = require('express');
const userRouter = Router();
const { getUsers,
        createUser,
        deleteUser,
        updateUser,
        getUserById } = require('../controllers/userController');
const { restrictTo } =require('../middlewares/userMiddleware')

userRouter.route('/')
        .get(restrictTo('admin'),getUsers)      
        .post(createUser)
userRouter.route('/:id')
        .delete(restrictTo('admin'), deleteUser)
        .put(updateUser)
        .get(getUserById)

module.exports = userRouter;