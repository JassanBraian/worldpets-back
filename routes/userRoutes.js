const {Router} = require('express');
const userRouter = Router();
const { getUsers,
        createUser,
        deleteUser,
        updateUser} = require('../controllers/userController')

userRouter.route('/')
        .get(getUsers)
        .post(createUser)
userRouter.route('/:id')
        .delete(deleteUser)
        .put(updateUser)

module.exports = userRouter;