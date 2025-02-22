const PostService = require('../services/PostService');

class PostController {
  async create(req, res) {
    try {
      const { title, text, imageUrl, tags } = req.body;
      const { _id } = req.user;
      const post = await PostService.create(title, text, imageUrl, tags, _id);

      res.json(post);
    } catch (error) {
      console.error("PostController/create: coudn't create this post.", error.message);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();

      res.json(posts);
    } catch (error) {
      console.error("PostController/getAll: coudn't get posts.", error.message);
    }
  }

  async getSingle(req, res) {
    try {
      const postId = req.params.id;
      const post = await PostService.getSingle(postId);

      res.json(post);
    } catch (error) {
      console.error("PostController/getSingle: coudn't get this post.", error.message);
    }
  }

  async update(req, res) {
    try {
      const { title, text, imageUrl, tags } = req.body;
      const postId = req.params.id;
      const post = await PostService.update(title, text, imageUrl, tags, postId);

      res.json(post);
    } catch (error) {
      console.error("PostController/update: coudn't update this post.", error.message);
    }
  }

  async remove(req, res) {
    try {
      const postId = req.params.id;
      const postData = await PostService.remove(postId);

      res.json(postData);
    } catch (error) {
      console.error("PostController/remove: coudn't remove this post.", error.message);
    }
  }
}

module.exports = new PostController();
