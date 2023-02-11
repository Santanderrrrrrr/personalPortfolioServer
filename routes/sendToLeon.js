const express = require('express')
const router = express.Router()

const { sendToLeonController } = require('../controllers/sendToLeonController')



router.post('/', sendToLeonController)

module.exports = router;