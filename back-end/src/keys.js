const dotenv = require('dotenv')
dotenv.config()
const dbKeys = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

module.exports = dbKeys


