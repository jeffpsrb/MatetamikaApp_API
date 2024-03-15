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
        sql: 'SELECT identitas_siswa FROM role_siswa ORDER BY created_at DESC LIMIT 5'
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