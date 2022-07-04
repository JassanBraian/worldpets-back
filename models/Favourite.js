const { Schema, model } = require('mongoose');

const favouriteSchema = new Schema({
  publication: {
    type: Schema.Types.ObjectId,
    ref: 'Publication'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Favourite = model('Favourite', favouriteSchema);

module.exports = Favourite;
