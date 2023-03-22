/* eslint-disable no-useless-escape */

// регулярное выражение для валидации URL
const regexUrl = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/i;

// регулярное выражение для валидации ID
const regexId = /[0-9a-f]{24}/i;

module.exports = {
  regexUrl,
  regexId,
};
