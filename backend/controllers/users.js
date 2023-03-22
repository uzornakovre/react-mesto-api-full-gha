const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const { allowedCors } = require('../utils/allowedCors');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  CONFLICT,
} = require('../utils/resStatus');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK.CODE).send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(OK.CODE).send({ data: user });
      } else {
        next({ statusCode: NOT_FOUND.CODE, message: NOT_FOUND.USER_MESSAGE });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { origin } = req.headers;
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
}

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(CREATED.CODE).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ statusCode: INVALID_DATA.CODE, message: INVALID_DATA.MESSAGE });
      } else if (err.code === 11000) {
        next({ statusCode: CONFLICT.CODE, message: CONFLICT.EMAIL_MESSAGE });
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.status(OK.CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.MESSAGE);
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(OK.CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ statusCode: INVALID_DATA.CODE, message: INVALID_DATA.MESSAGE });
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(OK.CODE).send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(OK.CODE).send(user);
      } else {
        next({ statusCode: NOT_FOUND.CODE, message: NOT_FOUND.USER_MESSAGE });
      }
    })
    .catch(next);
};
