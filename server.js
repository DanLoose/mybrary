// if (process.env.NODE_ENV !== 'production') require('dotenv').parse()

const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes (controllers)/index')
const authorRouter = require('./routes (controllers)/authors')
const bookRouter = require('./routes (controllers)/books')

const app = express()

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')

app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mybrary', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to Mongoose'))

app.listen(process.env.PORT || 3000)