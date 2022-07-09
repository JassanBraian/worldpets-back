const { Schema, model } = require('mongoose');

const favouriteSchema = new Schema({
  publication: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ubication: { type: String, required: true },
    category: { type: String, required: true },
    photos: [
      {
        url: { type: String, required: true },
        position: { type: Number, required: true },
      }
    ],
    publiId: {
      type: Schema.Types.ObjectId,
      ref: 'Publication',
      required: true
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Favourite = model('Favourite', favouriteSchema);

module.exports = Favourite;
