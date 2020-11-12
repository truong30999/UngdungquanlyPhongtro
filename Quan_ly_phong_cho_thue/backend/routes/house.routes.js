const express =  require('express')
const router = express.Router()
const House = require('../controller/houseController')

router.post('/',House.createHouse)
router.get('/',House.getAllHouse)
router.get('/:houseId',House.getHouseById)
router.patch('/:houseId',House.updateHouse)
router.delete('/:houseId',House.deleteHouse)


module.exports = router