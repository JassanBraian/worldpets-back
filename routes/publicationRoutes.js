const { Router } = require('express');
const { 
    getPublication,
    createPublication,
    updatePublication,
    deletePublication
} = require('../controllers/publicationController');

const router = Router();

router.route('/')
    .get(getPublication)
    .post(createPublication);

router.route('/:id')
    .put(updatePublication)
    .delete(deletePublication);

module.exports = router;