const { Router } = require('express')
const apiControllers = require('../controllers/api.controllers')

const router = Router()

router.get('/', apiControllers.getRankedWikiData)

module.exports = router
