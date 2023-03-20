const Card = require('../models/card');
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
    .then((card) => res.status(CREATED.CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ statusCode: INVALID_DATA.CODE, message: INVALID_DATA.MESSAGE });
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
        Card.deleteOne({ cardId })
          .then(() => {
            res.status(OK.CODE).send({ message: FORBIDDEN.MESSAGE });
          })
          .catch((err) => next(err));
      } else if (card) {
        next({ statusCode: FORBIDDEN.CODE, message: FORBIDDEN.MESSAGE });
      } else if (!card) {
        next({ statusCode: NOT_FOUND.CODE, message: NOT_FOUND.CARD_MESSAGE });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next({ statusCode: INVALID_DATA.CODE, message: INVALID_DATA.MESSAGE });
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
        res.status(OK.CODE).send({ message: OK.LIKE_CARD_MESSAGE });
      } else {
        next({ statusCode: NOT_FOUND.CODE, message: NOT_FOUND.CARD_MESSAGE });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next({ statusCode: INVALID_DATA.CODE, message: INVALID_DATA.MESSAGE });
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
        res.status(OK.CODE).send({ message: OK.DISLIKE_CARD_MESSAGE });
      } else {
        next({ statusCode: NOT_FOUND.CODE, message: NOT_FOUND.CARD_MESSAGE });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next({ statusCode: INVALID_DATA.CODE, message: INVALID_DATA.MESSAGE });
      } else {
        next(err);
      }
    });
};
