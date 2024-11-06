const express = require('express')
const dotenv = require('dotenv')
const authRouter = require('./routes/auth/auth')
const userMiddleware = require("./middleware/user")
const avatarRouter = require('./routes/avatar/avatarRoute')
const credetials = require('./testEnv')
dotenv.config()

const PORT = process.env.PORT
const app = express()

//Middlewares
app.use(express.json())

//Routes 
app.use('/api/v1/', authRouter)
app.use('/api/v1/', avatarRouter)
app.use('/api/v1/protected', userMiddleware, (req, res) => {
  res.send('This is a protected routes => ')
})
//app.use('/api/v1')
app.get('/', (req, res) => {
  res.send('Hello by back')
})

app.listen(PORT, () => {
  console.log('listen on port ' + PORT + `ENV : ${credetials.password} : ${credetials.username}`)
})
