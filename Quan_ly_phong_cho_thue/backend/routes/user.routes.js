const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller.js')


router.get('/', user.getAllUser)
router.post('/', user.createUser)
router.get('/:userId', user.getUserById)
router.patch('/:userId', user.updateUser)
router.delete('/:userId', user.deleteUser)


module.exports = router;
