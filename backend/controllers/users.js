const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const User = require('../models/user');
const InvalidDataError = require('../utils/errors/InvalidDataError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
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
        next(new NotFoundError(NOT_FOUND.USER_MESSAGE));
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

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
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT.EMAIL_MESSAGE));
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
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
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
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'key', { expiresIn: '7d' });
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
        next(new NotFoundError(NOT_FOUND.USER_MESSAGE));
      }
    })
    .catch(next);
};
