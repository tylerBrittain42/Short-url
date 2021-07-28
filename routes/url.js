const express = require('express')
const router = express.Router()

const url_controller = require('../controllers/urlController')


router.get('/all', url_controller.get_all)

router.get('/:shortUrl', url_controller.redirect_short_url)

module.exports = router