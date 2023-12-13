import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './schemas/index.js'

// How to read a JSON file with type: 'json'
// import movies from './data/movies.json' with { type: 'json' }

// How to read a JSON file in ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('src/data/movies.json', 'utf8'))

// How to read a JSON file with createRequire
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./data/movies.json')

const app = express()
app.use(json())

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081']
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)

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
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data
  }
  // This is not RESTful, but it's just an example
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  res.status(200).json({
    message: 'Movie updated successfully',
    movie: updateMovie
  })
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  res.status(200).json({
    message: 'Movie deleted successfully'
  })
})

const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/movies`)
})
