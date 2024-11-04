const connection = require('../../config/mysql')
const moment = require('moment-timezone')

moment.tz.setDefault('Asia/Jakarta')

const store = (req, res) => {
    const{token_soal, question, true_answer} = req.body;
    const created_at = moment().format()
    connection.query({
        sql: 'INSERT INTO role_guru (token_soal, question, true_answer, created_at) VALUES (?, ?, ?, ?)',
        values: [token_soal, question, true_answer, created_at]
    }, _response(res))
}

const view = (req, res) => {
    connection.query({
        sql: 'SELECT identitas_siswa FROM role_siswa ORDER BY created_at DESC LIMIT 5'
    }, _response(res))
}

const viewToken = (req, res) => {
    connection.query({
        sql: 'SELECT token_soal FROM role_guru ORDER BY Created_at DESC LIMIT 1'
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
    view,
    viewToken
}