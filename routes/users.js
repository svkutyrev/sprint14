const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);


module.exports = router;
