const jwt = require('jsonwebtoken')

function generateToken(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token
  } catch (error) {
    return []
  }
}

function creditJwt(token) {
  const { nAttempts } = jwt.decode(token)

  if (parseInt(nAttempts) === 0) {
    return false
  }

  return true

}



module.exports = {
  generateToken,
  creditJwt
}
