const express =  require('express')
const router = express.Router()
const Auth = require('../controller/auth.controller')

router.post('/', Auth.hasAuthValidFields, Auth.isPasswordAndUserMatch, Auth.login)




module.exports = router