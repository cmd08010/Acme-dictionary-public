const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/', router)
app.listen(3000)