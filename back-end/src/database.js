const mariadb = require('mariadb')
const { dbKeys } = require('./keys')

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin_rafa',
  password: '2003',
  database: 'speakeria'
}
)

module.exports = pool

