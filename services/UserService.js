const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const ApiError = require('../exceptions/apiError');
const TokenService = require('./TokenService');

class UserService {
  async register(name, email, password) {
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      console.error(`UserService/registration: User with this email, ${email}, has been existed`);
      throw ApiError.BadRequest(`User with this email, ${email}, has been existed! Please login.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ name, email, password: hashedPassword });

    const token = TokenService.generateToken({ _id: user._id });

    return {
      ...user._doc,
      token,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.error(`UserService/login: User with this email, ${email}, hasn't existed`);
      throw ApiError.BadRequest(
        `User with this email, ${email}, hasn't existed! Please get registration.`,
      );
    }

    const isPasswordsComparable = await bcrypt.compare(password, user.password);
    if (!isPasswordsComparable) {
      console.error(`UserService/login: wrong password!`);
      throw ApiError.BadRequest('wrong password!');
    }

    const token = TokenService.generateToken({ _id: user._id });

    return {
      ...user._doc,
      token,
    };
  }

  async getUserInfo(userId) {
    const userInfo = await UserModel.findById(userId);

    return userInfo;
  }
}

module.exports = new UserService();
