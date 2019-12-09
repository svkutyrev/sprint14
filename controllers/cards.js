
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('card')
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.cookie('owner', owner).send({ card }))
    .catch((err) => res.status(404).send({ message: err.message }));
};


module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          Card.findByIdAndRemove(req.params.cardId)
            .then((cardRemove) => res.send({ remove: cardRemove }))
            .catch((err) => res.status(500).send({ message: err }));
        } else {
          res.status(404).send({ message: 'Это не ваша карта' });
        }
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => res.status(404).send({ message: err.message }));
};
