const connection = require('../../config/mysql')
const moment = require('moment-timezone')

moment.tz.setDefault('Asia/Jakarta')

const store = (req, res) => {
    const{question, true_answer} = req.body;
    const created_at = moment().format()
    connection.query({
        sql: 'INSERT INTO role_guru (question, true_answer, created_at) VALUES (?, ?, ?)',
        values: [question, true_answer, created_at]
    }, _response(res))
}

const view = (req, res) => {
    connection.query({
        sql: 'SELECT rs.identitas_siswa, rs.status, rg.question FROM role_siswa AS rs INNER JOIN role_guru AS rg ON rs.jawaban_siswa = rg.true_answer ORDER BY rg.created_at DESC'
    }, _response(res))
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
    store,
    view
}