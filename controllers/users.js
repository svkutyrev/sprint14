require('dotenv').config();
const express = require('express');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const app = express();
app.use(cookie());

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Такой пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // eslint-disable-next-line no-undef
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('token', token);
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
