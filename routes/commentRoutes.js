const { Router } = require('express');
const { isAdmin } = require('../middlewares/isAdmin');
const {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getCommentById
} = require('../controllers/commentController');

const router = Router();

router.route('/')
  .get(getComments)
  .post(createComment);

router.route('/:id')
  .put(updateComment)
  .delete(deleteComment)
  .get(getCommentById);

module.exports = router;
