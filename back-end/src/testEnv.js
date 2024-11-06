const dotenv = require('dotenv')
dotenv.config()
const credetials = {
  host: 'local host',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

module.exports = credetials
