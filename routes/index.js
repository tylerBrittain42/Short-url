const { body } = require('express-validator');
const url_controller = require('../controllers/urlController')
const express = require('express')
const router = express.Router()


router.get('/', url_controller.get_home)
router.post('/', 
            body('long_link').isURL().trim(), 
            url_controller.create_url)

router.get('/about', url_controller.get_about)

module.exports = router