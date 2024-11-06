const { createToken } = require("../querys/tokenQuerys");
const { findUser } = require("../querys/usersQuerys");

async function savedToken(token, userName) {
  // find the user in the database
  const user = await findUser(userName)
  const userId = parseInt(user.id)
  //insert a new token in the databasae
  await createToken(token, userId)
}

module.exports = {
  savedToken
}

/*
 * Note: there was a circular dependency error when 
 * i wast trayed use the funtion getUser() userService
 * For that reason i used directy the funtion findUser() from usersQuerys.js 
 *
 * */
