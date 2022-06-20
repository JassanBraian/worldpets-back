const { Router } = require('express');
const {
    getPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication
} = require('../controllers/publicationController');

const router = Router();

router.route('/')
    .get(getPublications)
    .post(createPublication);

router.route('/:id')
    .get(getPublicationById)
    .put(updatePublication)
    .delete(deletePublication)


module.exports = router;
