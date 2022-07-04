const { Router } = require('express');
const {
  getFavourites,
  createFavourite,
  updateFavourite,
  deleteFavourite,
  getFavouriteById,
  getFavouritesByUserId
} = require('../controllers/favouriteController');

const router = Router();

router.route('/')
  .get(getFavourites)
  .post(createFavourite);

router.route('/:id')
  .put(updateFavourite)
  .delete(deleteFavourite)
  .get(getFavouriteById);

router.route('/:userId')
  .get(getFavouritesByUserId);

module.exports = router;
