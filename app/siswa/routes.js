const router = require('express').Router()
const dbController = require('./controller')
const multer = require('multer')
const upload = multer({dest: 'uploads'})

router.post('/siswa/', upload.single('image'), dbController.store);


module.exports = router;