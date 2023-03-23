const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexUrl, regexId } = require('../utils/validationRules');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

// router.use(auth);
router.get('/', auth, getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(regexId),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexUrl),
  }),
}), updateUserAvatar);

module.exports = router;
