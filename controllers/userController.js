const UserService = require('../services/UserService');

class UserController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userData = await UserService.register(name, email, password);

      res.json(userData);
    } catch (error) {
      console.error('UserController/registration: ', error.message);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      res.json(userData);
    } catch (error) {
      console.error('UserController/login: ', error.message);
      next(error);
    }
  }

  async getUserInfo(req, res, next) {
    try {
      const {_id} = req.user;
      const userInfo = await UserService.getUserInfo(_id);

      res.json(userInfo);
    } catch (error) {
      console.error('UserController/getUserInfo: ', error.message);
      next(error);
    }
  }
}

module.exports = new UserController();
