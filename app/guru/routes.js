const router = require('express').Router()
const dbController = require('./controller')

router.post('/guru', dbController.store);
router.get('/leaderboard', dbController.view)

module.exports = router;