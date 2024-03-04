const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_tugas_akhir'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database as id', connection.threadId);
});


module.exports = connection;