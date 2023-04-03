/* eslint-disable prefer-promise-reject-errors */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { regexUrl } = require('../utils/validationRules');
const { UNAUTHORIZED } = require('../utils/resStatus');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Необходимо ввести корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 4,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Новый пользователь',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Информация о себе',
  },
  avatar: {
    type: String,
    validate: regexUrl,
    default: 'https://avatars.mds.yandex.net/i?id=150e3ccfcc5d7d099bfe9a3b0c3ccf0a0536312d-8253063-images-thumbs&n=13',
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject({
          statusCode: UNAUTHORIZED.CODE,
          message: UNAUTHORIZED.USER_MESSAGE,
        });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject({
              statusCode: UNAUTHORIZED.CODE,
              message: UNAUTHORIZED.PASSWORD_MESSAGE,
            });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
