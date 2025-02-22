const router = require('express').Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const {
  registrationValidation,
  loginValidation,
  postCreationValidation,
} = require('../validations/authValidation');
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware');

router.post('/register', registrationValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/info', checkAuthMiddleware, userController.getUserInfo);

router.post('/create', checkAuthMiddleware, postCreationValidation, postController.create);
router.get('/all', checkAuthMiddleware, postController.getAll);
router.get('/single/:id', checkAuthMiddleware, postController.getSingle);
router.patch('/update/:id', checkAuthMiddleware, postController.update);
router.delete('/remove/:id', checkAuthMiddleware, postController.remove);

module.exports = router;
