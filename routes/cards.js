
const cards = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

cards.get('/cards', getCards);
cards.post('/cards', createCard);
cards.delete('/cards/:cardId', deleteCard);

module.exports = cards;
