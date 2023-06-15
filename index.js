require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const promotionRouter = require('./routes/promotions')


connection()
//middleware
app.use(express.json())
app.use(cors())

app.use('/api/user', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/promotion', promotionRouter)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))