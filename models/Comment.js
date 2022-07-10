const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  description: {
    type: String,
    minlength: 10,
    maxlength: 500,
    required: [true, 'Please input a description']
  },
  isprivate: {
    type: Boolean,
    default: false,
  },
  publication: {
    title: { type: String, required: true },
    publiid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Publication'
    }
  },
  usersend: {
    name: {
      type: String,
      required: true
    },
    userid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
}, { timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = Comment;
