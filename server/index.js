const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()

const ac = require('./controllers/authController')
const treasureController = require('./controllers/treasureController')


const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db set!')
})

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)

app.get('/api/treasure/dragon', treasureController.dragonTreasure)
app.get('/api/treasure/user', treasureController.getUserTreasure)









app.listen(SERVER_PORT, () => {
    console.log(`listening on ${SERVER_PORT}`)
})