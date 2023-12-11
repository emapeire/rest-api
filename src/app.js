const express = require('express')
const crypto = require('node:crypto')
const movies = require('./data/movies.json')
const validateMovie = require('./schemas')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
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

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json(JSON.parse({ error: result.error.message }))
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...req.body
  }
  // This is not RESTful, but it's just an example
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})
