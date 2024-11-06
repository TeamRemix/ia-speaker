const mariadb = require('mariadb')
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin_rafa',
  password: '2003',
  database: 'speakeria'
});
async function createToken(content, userId) {
  let conn = await pool.getConnection()
  await conn.query('INSERT INTO tokens (content, userid) VALUES (?, ?)', [content, userId])
  await conn.end()
}

module.exports = {
  createToken
}
