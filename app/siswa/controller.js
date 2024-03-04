const connection = require('../../config/mysql')
const path = require('path')
const fs = require('fs')
const moment = require('moment-timezone')

moment.tz.setDefault('Asia/Jakarta')

const store = (req, res) => {
    const {identitas_siswa, status, jawaban_siswa} = req.body
    const created_at = moment().format()
    const image = req.file
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        connection.query({
            sql: 'INSERT INTO role_siswa (identitas_siswa, status, jawaban_siswa, image, created_at) VALUES (?, ?, ?, ?, ?)',
            values: [identitas_siswa, status, jawaban_siswa, `http://localhost:public/${image.originalname}`, created_at]
        }, _response(res))
    }
}



const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'Failed',
                response: 'failed to fetch data'
            })
        } else {
            res.send({
                status: 'succes',
                response: result
            })
        }
    }
}

module.exports = {
    store
}