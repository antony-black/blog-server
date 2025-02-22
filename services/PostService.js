const PostModel = require('../models/Post');

class PostService {
  async create(title, text, imageUrl, tags, userId) {
    const post = await PostModel.create({
      title,
      text,
      imageUrl,
      tags,
      userAuthor: userId,
    });

    return post;
  }

  async getAll() {
    const posts = await PostModel.find().populate('userAuthor').exec();

    return posts;
  }

  async getSingle(postId) {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
      { returnDocument: 'after' },
    ).populate('userAuthor');

    if (!post) {
      console.error("This post isn't existed.");
      throw Error("This post isn't existed.");
    }

    return post;
  }

  async update(title, text, imageUrl, tags, postId) {
    const postData = await PostModel.updateOne(
      { _id: postId },
      {
        title,
        text,
        imageUrl,
        tags,
      },
    );

    return postData;
  }

  async remove(postId) {
    const post = await PostModel.findOneAndDelete({ _id: postId });

    return post;
  }
}

module.exports = new PostService();
