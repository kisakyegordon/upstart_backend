// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://postgres:nunu@localhost:5432/upstart')

// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })


const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'upstart',
    password: 'nunu',
    port: 5432
});

module.exports = {pool, secret: "upstart-secret-key"};