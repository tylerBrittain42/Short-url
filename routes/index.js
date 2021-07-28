const express = require('express')
const router = express.Router()

const url_controller = require('../controllers/urlController')

router.get('/', url_controller.get_home)
router.post('/', url_controller.create_url)

module.exports = router