require('dotenv').config()


const express = require('express')
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')


const indexRouter = require('./routes/index')
const urlRouter = require('./routes/url')

const app = express(); 



// connecting to database
mongoose.connect("mongodb+srv://" + process.env.USER + ":" + process.env.PW + "@cluster0.cvgrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",   {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 

app.use(express.static('public'))


app.use('/', indexRouter)
app.use('/url', urlRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening at http://localhost:`)
  })