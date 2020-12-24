const express = require('express')
const router = express.Router()
const Room = require('../controller/room.controller')
const auth = require('../controller/auth.controller')

router.get('/', Room.getAllRoom)
router.get('/emptyRoom', Room.getEmptyRoom)
router.get('/notemptyRoom', Room.getNotEmptyRoom)

router.get('/:roomId', Room.getRoomById)

router.get('/house/:houseId',Room.getRoomByHouse)

router.get('/person/:roomId', Room.getPersonInRoom)

router.get('/service/:roomId', Room.getServideOfRoom)

router.post('/',auth.validJWTNeeded, Room.createRoom)

router.patch('/:roomId/addService/:serviceId',Room.addServiceToRoom)

router.patch('/:roomId/removeService/:serviceId',Room.removeServiceToRoom)

router.patch('/:roomId/addCustomer/:customerId', Room.addPersonToRoom)

router.patch('/:roomId/removeCustomer/:customerId', Room.removePersonToRoom)

router.patch('/:roomId', Room.updateRoom)

router.delete('/:roomId', Room.deleteRoom)

module.exports = router