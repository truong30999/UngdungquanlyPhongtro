const express =  require('express')
const router = express.Router()
const customer = require('../controller/customer.controller')
const fileUpload = require('../middleware/file-upload.js')



router.get('/', customer.getAllCustomer)
router.post('/',fileUpload.single('Image'), customer.createCustomer)
router.get('/:customerId', customer.getCustomerById)
router.patch('/:customerId',fileUpload.single('Image'), customer.updateCustomer)
router.delete('/:customerId', customer.deleteCustomer)
module.exports = router