const { body } = require("express-validator");

const registrationValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5}),
  body('name').isLength({ min: 3}),
  body('avatarUrl').optional().isURL(),
];

const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5}),
];

const postCreationValidation = [
  body('title').isLength({min: 3}).isString(),
  body('text').isLength({min: 3}).isString(),
  body('tags').isLength({min: 3}).optional().isArray(),
  body('imageUrl').isLength({min: 3}).optional().isURL(),
];

module.exports = { 
  registrationValidation, 
  loginValidation, 
  postCreationValidation 
};
