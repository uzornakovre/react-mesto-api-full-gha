const Card = require('../models/card');
const InvalidDataError = require('../utils/errors/InvalidDataError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  FORBIDDEN,
} = require('../utils/resStatus');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK.CODE).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED.CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card && String(card.owner) === req.user._id) {
        Card.deleteOne(card._id)
          .then(() => {
            res.status(OK.CODE).send({ message: OK.DEL_CARD_MESSAGE });
          })
          .catch((err) => next(err));
      } else if (card) {
        next(new ForbiddenError(FORBIDDEN.MESSAGE));
      } else if (!card) {
        next(new NotFoundError(NOT_FOUND.CARD_MESSAGE));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(OK.CODE).send({ data: card, message: OK.LIKE_CARD_MESSAGE });
      } else {
        next(new NotFoundError(NOT_FOUND.CARD_MESSAGE));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(OK.CODE).send({ data: card, message: OK.DISLIKE_CARD_MESSAGE });
      } else {
        next(new NotFoundError(NOT_FOUND.CARD_MESSAGE));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(INVALID_DATA.MESSAGE));
      } else {
        next(err);
      }
    });
};
