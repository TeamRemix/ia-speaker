const bcrypt = require('bcryptjs')

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

async function comparePassword(password, savedPassword) {
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  encryptPassword,
  comparePassword
}
