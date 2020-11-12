const express = require('express')
const router = express.Router()
const Room = require('../controller/roomController')

router.post('/', Room.createRoom)
router.patch('/:roomId', Room.updateRoom)
router.get('/', Room.getAllRoom)
router.get('/:roomId', Room.getRoomById)
router.delete('/:roomId', Room.deleteRoom)

module.exports = router