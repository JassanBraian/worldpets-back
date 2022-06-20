const { Schema, model } = require('mongoose');

const publicationSchema = new Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: [true, 'Please input a title']
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 500,
        required: [true, 'Please input a description']
    },
    ubication: {
        type: String,
        minlength: 10,
        maxlength: 500,
        required: [true, 'Please input a ubication']
    },
    category: {
        type: String,
        enum: {
            values: ['missing', 'found', 'up for adoption'],
            message: 'Wrong input value'
        },
        required: [true, 'Please select a category']
    },
    photos: [{
      url: {
        type: String,
        required: [true, 'Please input a photo']
      },
      position: Number
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, { timestamps: true });

const Publication = model('Publication', publicationSchema);

module.exports = Publication;
