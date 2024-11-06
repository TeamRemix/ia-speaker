const { findUser, savedUser } = require('../querys/usersQuerys')
const { encryptPassword } = require('../lib/bcrypt')
const { generateToken } = require('./jwtServices')
const { payloadUserStructure } = require('../payloads')
const { savedToken } = require('./tokenService')

async function createUser(user) {
  const exis = await findUser(user.username)
  if (exis) {
    return {
      message: 'There is a User whit that user-name',
      created: false
    }
  }

  //encript the password and create a new User entity on the data base
  user.password = await encryptPassword(user.password)
  await savedUser(user)

  /*
   * There is objet whit the structure payload for each type user.
   * user whit account : payloadUserStructure
   * user whitout account : payloadGuestStructure*/
  const payload = payloadUserStructure
  payload.username = user.username

  //genetation token
  const token = generateToken(payload)

  //create a new token entity in the database
  await savedToken(`${token}`, user.username)
  return {
    message: 'User created sucesfull',
    created: true,
    token: `${token}`
  }

}

async function getUser(userName) {
  const user = await findUser(userName)
  return user
}

function findLastToken(userName) {

}

module.exports = {
  createUser,
  findLastToken,
  getUser
}
