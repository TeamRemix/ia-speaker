//const { pool } = require('../database')
const mariadb = require('mariadb')
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin_rafa',
  password: '2003',
  database: 'speakeria'
})

const findUser = async (userName) => {
  try {
    let conn = await pool.getConnection()
    const user = await conn.query('SELECT * FROM users WHERE username = ?', [userName])

    if (user[0]) {
      return user[0]
    }

    return false


  } catch (error) {
    console.error(`Error while databas procesing ${error}`)

    return false
  }


}



async function savedUser(user) {
  /*
   * field of table user 
   * name 
   * username 
   * lastname 
   * password
   * */

  let conn = await pool.getConnection()
  await conn.query('INSERT INTO users (name, username,lastname, password) VALUES (?, ?, ?, ?)', [user.name, user.username, user.lastname, user.password])
}

module.exports = {
  findUser,
  savedUser
}
