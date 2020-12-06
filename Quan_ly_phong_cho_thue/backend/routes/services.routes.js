const express = require('express')
const router = express.Router()
const Service = require('../controller/services.controller')


router.post('/', Service.createService)
router.patch('/:serviceId', Service.updateService)
router.get('/', Service.getAllService)
router.get('/user/:userId', Service.getServiceOfUser)
router.get('/:serviceId', Service.getServiceById)
router.delete('/:serviceId', Service.deleteService)

module.exports = router
