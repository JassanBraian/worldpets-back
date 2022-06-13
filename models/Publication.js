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
    category: {
        type: String,
        enum: {
            values: ['missing', 'found', 'up for adoption'],
            message: 'Wrong input value'
        },
        default: 'missing'
    },
    editedAt: Date
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;