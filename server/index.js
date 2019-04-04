const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()

const ac = require('./controllers/authController')
const tc = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')


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

app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, tc.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, tc.addUserTreasure)
app.get('/api/treasure/all', auth.adminsOnly, tc.getAllTreasure)









app.listen(SERVER_PORT, () => {
    console.log(`listening on ${SERVER_PORT}`)
})