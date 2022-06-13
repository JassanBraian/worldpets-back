const { Router } = require('express');
const { getPublication } = require('../controllers/publicationController');

const router = Router();

router.route('/')
    .get(getPublication);

module.exports = router;