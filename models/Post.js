const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    userAuthor: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

module.exports = model('Post', PostSchema);
