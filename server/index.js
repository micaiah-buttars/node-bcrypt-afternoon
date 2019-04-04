const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()

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







app.listen(SERVER_PORT, () => {
    console.log(`listening on ${SERVER_PORT}`)
})