const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'))
})

app.use('/public', express.static(path.join(__dirname, '/frontend/public')))

app.get('/beers', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/beers.json'))
})

app.get('/beers/:id', (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    res.status(400).json("id must be a number!")
  } else {
    fs.readFile(path.join(__dirname, '/data/beers.json'), 'utf8', (err, rawData) => {
      if (err) {
        console.log(err)
        res.status(500).json("file not found")
      } else {
        const data = JSON.parse(rawData)
        const foundBeer = data.find((beer) => beer.id === id)
        if (foundBeer) res.json(foundBeer)
        else res.status(404).json("id not exists")
      }
    })
  }
})

app.listen(port, () => {
  console.log(`listening on http://127.0.0.1:${port}`)
})