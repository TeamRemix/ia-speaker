const express = require('express')
const router = express.Router()
const { generateToken } = require('../../services/jwtServices')
const { createUser } = require('../../services/userService')
//Sign up
router.post('/auth/signup', async (req, res) => {
  //get data users
  /*
   * {
   * userName: 'test',
   * name: 'ralf'
   * lastName: 21
   * password: '1234'
   * }
   * */

  /*
   * Structure jwt payload
   * {
   * id : 'id-user',
   * userName: 'test',
   * nAttempts: 3
   * }*/

  /*
   * "username": "rafapro",
   * "name": "rafael",
   * "lastname": "plaza",
   * "password": "2003"*/
  const user = {
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    password: req.body.password
  }
  const result = await createUser(user)

  if (!result.created) {
    res.status(400).json(result)
    return
  }

  res.status(200).json(result)
  //response whit a new token and state create

})

//Sign in
router.post('/auth/signin')

//Get JWT for unregistered users
router.get('/auth/guest', async (req, res) => {

  try {

    //Generate token
    const token = generateToken({
      nAttempts: process.env.ATTEMPTS_USER_NORMAL,
      userName: "guest"
    })
    console.log(`secret signature ${process.env.JWT_SECRET}`)

    res.json({ token })

  } catch (error) {
    res.status(500).json({ message: 'error server' })
  }
})


module.exports = router
