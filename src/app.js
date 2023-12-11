const express = require('express')
const crypto = require('node:crypto')
const movies = require('./data/movies.json')

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
  const { title, year, director, duration, poster, genre, rate } = req.body
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate
  }
  // This is not RESTful, but it's just an example
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})
