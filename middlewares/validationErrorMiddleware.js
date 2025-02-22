const { validationResult } = require('express-validator');

const ApiError = require('../exceptions/apiError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('UserController/registration: ', errors.array());
    return next(ApiError.BadRequest('Validation error!', errors.array()));
  }

  next();
};
