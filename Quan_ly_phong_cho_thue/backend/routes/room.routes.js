const express = require('express')
const router = express.Router()
const Room = require('../controller/room.controller')
const auth = require('../controller/auth.controller')
router.post('/',auth.validJWTNeeded, Room.createRoom)
router.patch('/:roomId', Room.updateRoom)
router.get('/', Room.getAllRoom)
router.get('/:roomId', Room.getRoomById)
router.delete('/:roomId', Room.deleteRoom)
router.patch('/:roomId/customer/:customerId', Room.addPersonToRoom)

module.exports = router