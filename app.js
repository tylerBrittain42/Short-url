const express = require('express');


const indexRouter = require('./routes/index')
const urlRouter = require('./routes/url')

const app = express(); 
const port = 3000;

app.use('/', indexRouter);
app.use('/url', urlRouter)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })