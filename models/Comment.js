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
  publication:{
    type: Schema.Types.ObjectId,
    ref: 'Publication'
  },
  usersend:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = Comment;
