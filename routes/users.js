const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUser, deleteUser, getUser } = require('../controllers/users')


router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;