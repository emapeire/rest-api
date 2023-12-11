const express = require('express')
const movies = require('./data/movies.json')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.status(404).json({ message: 'Movie not found' })
  }
})

const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})
