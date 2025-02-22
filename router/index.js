const router = require('express').Router();
const multer = require('multer');

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const {
  registrationValidation,
  loginValidation,
  postCreationValidation,
} = require('../validations/authValidation');
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware');
const validationErrorMiddleware = require('../middlewares/validationErrorMiddleware');

const uploadDestination = 'uploads';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDestination);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/auth/register',
  registrationValidation,
  validationErrorMiddleware,
  userController.register,
);
router.post(
  '/auth/login', 
  loginValidation, 
  validationErrorMiddleware, 
  userController.login
);
router.get('/auth/info', checkAuthMiddleware, userController.getUserInfo);
router.post(
  '/upload', 
  checkAuthMiddleware, 
  upload.single('image'), 
  postController.upload
);
router.get('/posts/all', postController.getAll);
router.get('/posts/single/:id', postController.getSingle);
router.post(
  '/posts/create',
  checkAuthMiddleware,
  postCreationValidation,
  validationErrorMiddleware,
  postController.create,
);
router.patch('/posts/update/:id', checkAuthMiddleware, postController.update);
router.delete('/posts/remove/:id', checkAuthMiddleware, postController.remove);

module.exports = router;
