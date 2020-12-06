const express =  require('express')
const router = express.Router()
const bill = require('../controller/bill.controller')

router.get('/',bill.getAllBill )
router.get('/currentmonth',bill.getBillInMonth)
router.post('/',bill.createBill)
router.patch('/:billId', bill.updateBill)
router.delete('/:billId', bill.deleteBill)
router.get('/:billId', bill.getBillById)


module.exports = router