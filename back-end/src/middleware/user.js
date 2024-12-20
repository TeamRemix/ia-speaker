const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]
  if (!token) {
    return res.status(401).json({ message: "Access denied" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authicate token" })
    }

    req.user = data
    next()
  })
}

module.exports = verifyJWT
