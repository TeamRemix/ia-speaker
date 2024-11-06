const mariadb = require('mariadb')

const pool1 = mariadb.createConnection({
  host: 'localhost',
  user: 'admin_rafa',
  password: '2003',
  database: 'speakeria'
}
)

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin_rafa',
  password: '2003',
  database: 'speakeria'
});
async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    //'SELECT * FROM users WHERE username = ?', [userName]

    const res = await conn.query('SELECT * FROM users WHERE id = ?', [10])
    //const res = await conn.query('INSERT INTO users (name, username,lastname, password) VALUES (?, ?, ?, ?)', ["Ralfsimon", "Ralf-melo", "Plaza", "2003"])
    console.log(`${JSON.stringify(res)}`); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}
//asyncFunction()

