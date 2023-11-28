const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'))
})

/* app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/public/style.css'))
}) */

app.use('/public', express.static(path.join(__dirname, '/frontend/public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})