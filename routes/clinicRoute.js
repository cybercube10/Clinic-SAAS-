const express = require('express')
const router = express.Router()
const {upgradeUser,registerClinic} = require('../controllers/clinicController')


router.post('/registerClinic',registerClinic)
router.put('/upgradeUser',upgradeUser)
module.exports = router