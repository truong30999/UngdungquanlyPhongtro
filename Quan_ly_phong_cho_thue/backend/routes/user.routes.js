const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller.js')
const auth = require('../controller/auth.controller.js')
const fileUpload = require('../middleware/file-upload.js')


router.get('/', user.getAllUser)
router.post('/',fileUpload.single('Image'), user.createUser)
router.get('/:userId', user.getUserById)
router.patch('/:userId',fileUpload.single('Image'), user.updateUser)
router.delete('/:userId', user.deleteUser)


module.exports = router;
