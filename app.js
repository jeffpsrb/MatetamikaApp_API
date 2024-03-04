const express = require('express')
const routerSiswa = require('./app/siswa/routes')
const routerGuru = require('./app/guru/routes')
const path = require('path')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/role_siswa/', routerSiswa)
app.use('/api/role_guru/', routerGuru)
app.use('/public', express.static(path.join(__dirname, 'uploads')))

app.use((req, res) => {
    res.status(404)
    res.send({
        status: 'Failed',
        message: 'Resource' + req.originalUrl + 'Not Foud'
    })
}) 


app.listen(3001, () => console.log('server: http://localhost:3001'))