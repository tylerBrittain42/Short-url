const express = require('express')
const ejs = require('ejs')
const path = require('path')


const indexRouter = require('./routes/index')
const urlRouter = require('./routes/url')

const app = express(); 
const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/url', urlRouter)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })