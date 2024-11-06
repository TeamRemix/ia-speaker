const express = require('express')
const router = express.Router()
const userMiddleware = require('../../middleware/user')
const jwt = require('jsonwebtoken')
const { textGeneration } = require('../../services/avatarService')
const { creditJwt } = require('../../services/jwtServices')

router.post('/avatar/interact/text', userMiddleware, async (req, res) => {
  if (!req.body.promt) {
    res.status(400).json({ message: 'There is not any promt in the request' })
  }

  const token = req.headers["authorization"]

  if (!creditJwt(token)) {
    res.status(402).json({ message: `you don't have enough credit` })
    //await textGeneration()
  }

  res.json({ status: 200 })

  //send response and new token whit  the updated payload
})

router.post('/avatar/interact/video', userMiddleware, async (req, res) => {

})

module.exports = router
